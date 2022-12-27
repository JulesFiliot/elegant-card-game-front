import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { toast } from 'react-hot-toast';
import Card from '../../card/containers/Card';
import ChatPanel from './ChatPanel';
import 'bootstrap/dist/css/bootstrap.css';
import './Battle.css';
import { SocketContext } from '../../../context/socket';
import Loader from '../../card/components/Loader';

export default function Battle(/* { setCurrentComponent, components } */) {
  const { notifierSocket } = useContext(SocketContext);
  const me = useSelector((state) => state.myUserReducer.user);
  const opponent = useSelector((state) => state.myUserReducer.opponent);
  const myCardsFromReducer = useSelector((state) => state.myUserReducer.fightCards);
  const users = { me: 'ME', opponent: 'OPPONENT' };
  const [myCards, setMyCards] = useState(myCardsFromReducer);
  const [opponentCards, setOpponentCards] = useState([]);
  const [mySelectedCard, setMySelectedCard] = useState(null);
  const [opponentSelectedCard, setOpponentSelectedCard] = useState(null);
  const [duelInfo, setDuelInfo] = useState({ myAp: 100, opponentAp: 100, turn: users.opponent });
  const [isLoading, setIsLoading] = useState({ main: false, endTurn: false, attack: false });

  const endTurn = async () => {
    setIsLoading((old) => ({ ...old, main: true, endTurn: true }));
    setMySelectedCard(null);
    setOpponentSelectedCard(null);
    const payload = {
      duelId: opponent.duel_id,
    };
    const context = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    fetch(`${process.env.REACT_APP_DUEL_URL}/end_turn/`, context)
      .then((response) => {
        if (!response.ok) throw new Error('Something went wrong while ending turn');
        toast.success('Turn ended! Waiting for stats update...');
      })
      .catch((err) => {
        toast.error(err.toString());
        setIsLoading({ main: false, endTurn: false, attack: false });
      });
  };

  const attack = async () => {
    setIsLoading((old) => ({ ...old, main: true, attack: true }));
    const payload = {
      duelId: opponent.duel_id,
      attCardId: mySelectedCard.id,
      defCardId: opponentSelectedCard.id,
    };
    const context = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    fetch(`${process.env.REACT_APP_DUEL_URL}/attack/`, context)
      .then((response) => {
        if (!response.ok) throw new Error('Something went wrong while sending attack');
        toast.success('Attack sent! Waiting for stats update...');
        setMySelectedCard(null);
        setOpponentSelectedCard(null);
      })
      .catch((err) => {
        toast.error(err.toString());
        setIsLoading({ main: false, endTurn: false, attack: false });
      });
  };

  // socket listeners init
  useEffect(() => {
    notifierSocket.on('duel_info', (data) => {
      // todo is user_1_id string or int?
      if (data.user_1_id === me.id) {
        setMyCards(data.user_1_cards_info);
        setOpponentCards(data.user_2_cards_info);
        setDuelInfo({
          myAp: data.user_1_ap,
          opponentAp: data.user_2_ap,
          turn: data.turn === 1 ? users.me : users.opponent,
        });
        toast.success('Stats updated!');
      } else {
        setMyCards(data.user_2_cards_info);
        setOpponentCards(data.user_1_cards_info);
        setDuelInfo({
          myAp: data.user_2_ap,
          opponentAp: data.user_1_ap,
          turn: data.turn === 1 ? users.opponent : users.me,
        });
        toast.success('Stats updated!');
      }
      setIsLoading({ main: false, endTurn: false, attack: false });
    });

    return () => {
      notifierSocket.off('duel_info');
    };
  }, []);

  return (
    <div className="card-battle-arena">
      <div className="chat-panel-container">
        <ChatPanel
          user1={me}
          user2={opponent}
        />
      </div>

      <div className="player-cards">
        <div className="player-card-row">
          {opponentCards.map((c) => (
            <Card
              display_type="BATTLE"
              data={c}
              hidePrice
              onClick={() => setOpponentSelectedCard(c)}
              selected={opponentSelectedCard && opponentSelectedCard.id === c.id}
              isOpponent
              disabled={c.hp <= 0}
            />
          ))}
        </div>
        <div className="commands">
          <div className="user-infos user1">
            <Icon name={`arrow down${duelInfo.turn === users.me ? ' blue' : ''}`} />
            <span className="username">{`${me.surName} ${me.lastName}`}</span>
            <div className="user-energy">
              {duelInfo.myAp}
              {' '}
              <Icon name="bolt" />
            </div>
          </div>
          <button
            className="battleBtn btn btn-primary attack"
            type="button"
            onClick={async () => endTurn()}
            disabled={isLoading.main || duelInfo.turn !== users.me}
          >
            End turn
            {' '}
            <Icon className="x icon" />
            {isLoading.endTurn && <Loader />}
          </button>
          <button
            className="battleBtn btn btn-primary attack"
            type="button"
            onClick={async () => attack()}
            disabled={
              isLoading.main
              || !mySelectedCard
              || !opponentSelectedCard
              || duelInfo.turn !== users.me
            }
          >
            Attack
            {' '}
            <Icon name="fire" />
            {isLoading.attack && <Loader />}
          </button>
          <div className="user-infos user2">
            <Icon name={`arrow up${duelInfo.turn === users.opponent ? ' blue' : ''}`} />
            <span className="username">{`${opponent.surName} ${opponent.lastName}`}</span>
            <div className="user-energy">
              {duelInfo.opponentAp}
              {' '}
              <Icon name="bolt" />
            </div>
          </div>
        </div>
        <div className="player-card-row">
          {myCards.map((c) => (
            <Card
              display_type="BATTLE"
              data={c}
              hidePrice
              onClick={() => setMySelectedCard(c)}
              selected={mySelectedCard && mySelectedCard.id === c.id}
              disabled={c.hp <= 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
