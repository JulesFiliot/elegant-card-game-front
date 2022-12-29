import React, { useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../../../context/socket';
import { setFightCards, setOpponent } from '../../../core/actions';
import Loader from '../../card/components/Loader';
import './Wait.css';

export default function Wait({ setCurrentComponent, components }) {
  const { notifierSocket } = useContext(SocketContext);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.myUserReducer.user);
  const fightCards = useSelector((state) => state.myUserReducer.fightCards);

  const cancelSearch = async () => {
    const context = {
      method: 'GET',
    };
    fetch(`${process.env.REACT_APP_POOL_URL}/cancel_pool/${user.id}`, context)
      .then((response) => {
        if (!response.ok) throw new Error('Something went wrong while cancelling opponent search');
        toast.success('Opponent search cancelled!');
        dispatch(setFightCards([]));
        setCurrentComponent(components.chooseCard);
      })
      .catch((err) => {
        toast.error(err.toString());
      });
  };

  const handleBeforeUnload = async () => {
    cancelSearch();
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };

  // joining pool
  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    const context = {
      method: 'GET',
    };
    fetch(`${process.env.REACT_APP_POOL_URL}/pool/${user.id}`, context)
      .then((response) => {
        if (!response.ok) throw new Error('Something went wrong while entering the pool');
        toast.success('You\'re in the pool, please wait!');
      })
      .catch((err) => {
        setCurrentComponent(components.chooseCard);
        toast.error(err.toString());
      });
  }, []);

  // socket listeners init
  useEffect(() => {
    notifierSocket.on('message', async (msg) => {
      const data = JSON.parse(msg);
      const player1Id = parseInt(data.player_1.id, 10);
      const player2Id = parseInt(data.player_2.id, 10);
      const isMePlayer1 = player1Id === user.id;
      const isMePlayer2 = player2Id === user.id;

      if ((isMePlayer1 || isMePlayer2) && data.state === 'choose_cards') {
        const opponentId = isMePlayer1 ? player2Id : player1Id;

        // get opponent info
        const userContext = {
          method: 'GET',
        };
        fetch(`${process.env.REACT_APP_API_URL}/user/${opponentId}`, userContext)
          .then((res) => {
            if (!res.ok) throw new Error('Something went wrong while fetching opponent info');
            return res.json();
          })
          .then((opInfo) => dispatch(setOpponent(opInfo)))
          .catch((err) => toast.error(err.toString()));

        // send chosen cards
        const payload = {
          duelId: data.duel_id,
          userId: user.id,
          cardIds: fightCards.map((card) => card.id),
        };
        const context = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        };
        fetch(`${process.env.REACT_APP_DUEL_URL}/choose_cards/`, context)
          .then((response) => {
            if (!response.ok) throw new Error('Something went wrong while sending chosen cards to duel server');
            setCurrentComponent(components.battle);
            toast.success('Opponent found! Please wait for the duel to start!');
          })
          .catch((err) => {
            setCurrentComponent(components.chooseCard);
            toast.error(err.toString());
          });
      }
    });

    return () => {
      notifierSocket.off('message');
    };
  }, []);

  return (
    <div className="waitingContainer">
      <iframe
        title="Joseph Joestar dueling you"
        src="https://giphy.com/embed/XlmIK6MGuuVbrre1bU"
        width="480"
        height="270"
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen
      />
      <div className="separator" />
      <Loader />
      <div className="title">{'Searching for opponent. Only leave this page if you\'d like to cancel search.'}</div>
      <button
        className="btn removeBtn"
        type="button"
        onClick={() => cancelSearch()}
      >
        CANCEL
      </button>
    </div>
  );
}
