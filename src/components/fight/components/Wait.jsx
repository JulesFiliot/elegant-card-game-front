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
    notifierSocket.on('pool:opponentFound', (opponent) => {
      // todo is it duel_id or duelId inside data?
      const data = JSON.parse(opponent);

      // set opponent
      dispatch(setOpponent(data));

      // choose cards
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
    });

    return () => {
      notifierSocket.off('pool:opponentFound');
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
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setCurrentComponent(components.battle);
          window.removeEventListener('beforeunload', handleBeforeUnload);
        }}
      >
        go to fight arena | TO DELETE
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          notifierSocket.emit('skipOpponentWait');
        }}
      >
        manually ask for opponent | TO DELETE
      </button>
    </div>
  );
}
