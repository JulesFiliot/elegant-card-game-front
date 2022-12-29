import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Icon } from 'semantic-ui-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Card from '../../card/containers/Card';
import ChatPanel from './ChatPanel';
import 'bootstrap/dist/css/bootstrap.css';
import './Battle.css';
import { SocketContext } from '../../../context/socket';
import Loader from '../../card/components/Loader';
import { setFightCards } from '../../../core/actions';

export default function Battle({ setCurrentComponent, components }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notifierSocket } = useContext(SocketContext);
  const me = useSelector((state) => state.myUserReducer.user);
  const opponent = useSelector((state) => state.myUserReducer.opponent);
  const myCardsFromReducer = useSelector((state) => state.myUserReducer.fightCards);
  const users = { me: 'ME', opponent: 'OPPONENT' };
  const [winner, setWinner] = useState(null);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [myCards, setMyCards] = useState(myCardsFromReducer);
  const [opponentCards, setOpponentCards] = useState([]);
  const [mySelectedCard, setMySelectedCard] = useState(null);
  const [opponentSelectedCard, setOpponentSelectedCard] = useState(null);
  const [duelInfo, setDuelInfo] = useState({
    duelId: 0, myAp: 100, opponentAp: 100, turn: users.opponent,
  });
  const [isLoading, setIsLoading] = useState({ main: false, endTurn: false, attack: false });

  const endTurn = async () => {
    setIsLoading((old) => ({ ...old, main: true, endTurn: true }));
    setMySelectedCard(null);
    setOpponentSelectedCard(null);
    const payload = {
      duelId: duelInfo.duelId,
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
      duelId: duelInfo.duelId,
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

  const endGame = () => {
    setCurrentComponent(components.chooseCard);
    dispatch(setFightCards([]));
    navigate('/menu');
  };

  const gameOverModal = () => {
    const isWinnerMe = winner === users.me;
    return (
      <Modal show={showGameOverModal} onHide={() => setShowGameOverModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>GAME OVER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{
            fontSize: '25px',
            fontWeight: 'bold',
            textAlign: 'center',
            color: `${isWinnerMe ? 'green' : 'red'}`,
          }}
          >
            {isWinnerMe ? 'YOU WIN!' : 'YOU LOOSE!'}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowGameOverModal(false)}>Close</Button>
          <Button variant="primary" onClick={() => { setShowGameOverModal(false); endGame(); }}>To menu</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  useEffect(() => {
    if (winner) setShowGameOverModal(true);
  }, [winner]);

  // clean up on unmount
  useEffect(() => () => endGame(), []);

  // socket listeners init
  useEffect(() => {
    notifierSocket.on('message', (res) => {
      const data = JSON.parse(res);
      const player1Id = parseInt(data.player_1?.id, 10);
      const player2Id = parseInt(data.player_2?.id, 10);
      const isMsgForMe = player1Id === me.id || player2Id === me.id;

      if ((data.state === 'fighting' || data.state === 'game_over') && isMsgForMe) {
        if (player1Id === me.id) {
          setMyCards(data.player_1?.user_card_ids);
          setOpponentCards(data.player_2?.user_card_ids);
          setDuelInfo((old) => ({
            ...old,
            myAp: data.player_1?.user_ap,
            opponentAp: data.player_2?.user_ap,
            duelId: data.duel_id,
            turn: data.turn === 1 ? users.me : users.opponent,
          }));
          toast.success('Stats updated!');
        } else {
          setMyCards(data.player_2?.user_card_ids);
          setOpponentCards(data.player_1?.user_card_ids);
          setDuelInfo((old) => ({
            ...old,
            myAp: data.player_2?.user_ap,
            opponentAp: data.player_1?.user_ap,
            duelId: data.duel_id,
            turn: data.turn === 1 ? users.opponent : users.me,
          }));
          toast.success('Stats updated!');
        }
      }

      const winnerIdDB = parseInt(data.winner_id, 10);
      if (winnerIdDB === me.id || winnerIdDB === opponent.id) {
        setWinner(winnerIdDB === me.id ? users.me : users.opponent);
      }
      setIsLoading({ main: false, endTurn: false, attack: false });
    });

    return () => {
      notifierSocket.off('message');
    };
  }, []);

  return (
    <div className="card-battle-arena">
      {gameOverModal()}
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
            disabled={isLoading.main || duelInfo.turn !== users.me || winner}
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
              || winner
              || duelInfo.myAp <= 0
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
