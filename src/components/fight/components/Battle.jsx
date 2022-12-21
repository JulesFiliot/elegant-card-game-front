import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import Card from '../../card/containers/Card';
import ChatPanel from './ChatPanel';
import 'bootstrap/dist/css/bootstrap.css';
import './Battle.css';

export default function Battle(/* { setCurrentComponent, components } */) {
  const myFightCards = useSelector((state) => state.myUserReducer.fightCards);
  const me = useSelector((state) => state.myUserReducer.user);
  const [mySelectedCard, setMySelectedCard] = useState(null);
  const [opponentSelectedCard, setOpponentSelectedCard] = useState(null);

  const endTurn = () => {
    setMySelectedCard(null);
    setOpponentSelectedCard(null);
  };

  return (
    <div className="card-battle-arena">
      <div className="chat-panel-container">
        <ChatPanel
          user1={me}
          user2={me.surName === 'supercool_user2' ? {
            id: 16, email: null, lastName: 'family_cool', surName: 'supercool_user2_opponent',
          } : {
            id: 6, email: null, lastName: 'family_cool', surName: 'supercool_user2',
          }}
        />
      </div>

      <div className="player-cards">
        <div className="player-card-row">
          {myFightCards.map((c) => (
            <Card
              display_type="BATTLE"
              data={c}
              hidePrice
              onClick={() => setMySelectedCard(c)}
              selected={mySelectedCard && mySelectedCard.id === c.id}
            />
          ))}
        </div>
        <div className="commands">
          <div className="user-infos user1">
            <Icon name="arrow down" />
            <span className="username">cool_user1_1000</span>
            <div className="user-energy">
              100
              {' '}
              <Icon name="bolt" />
            </div>
          </div>
          <button className="btn btn-primary attack" type="submit" onClick={() => endTurn()}>
            End turn
            {' '}
            <Icon className="x icon" />
          </button>
          <button className="btn btn-primary attack" type="submit">
            Attack
            {' '}
            <Icon name="fire" />
          </button>
          <div className="user-infos user2">
            <Icon name="arrow up" />
            <span className="username">user2</span>
            <div className="user-energy">
              100
              {' '}
              <Icon name="bolt" />
            </div>
          </div>
        </div>
        <div className="player-card-row">
          {myFightCards.map((c) => (
            <Card
              display_type="BATTLE"
              data={c}
              hidePrice
              onClick={() => setOpponentSelectedCard(c)}
              selected={opponentSelectedCard && opponentSelectedCard.id === c.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
