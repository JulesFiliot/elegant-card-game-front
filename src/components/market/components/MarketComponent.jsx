import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Card from '../../card/containers/Card';
import { userUpdate } from '../../../core/actions';
import './MarketComponent.css';

function MarketComponent({ mode }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.myUserReducer.user);
  const [cards, setCards] = useState('');
  const [selectedCard, setSelecedCard] = useState(null);
  const navigate = useNavigate();

  function refreshUser(isValid, isBuy) {
    if (!isValid && isBuy) {
      toast.error('Transaction failed: not enough money');
      return;
    }
    if (!isValid) {
      toast.error('Transaction failed');
      return;
    }
    fetch(`${process.env.REACT_APP_API_URL}/user/${user.id}`, { method: 'GET' }).then(
      (response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('error fetching user');
      },
    )
      .then((response) => {
        dispatch(userUpdate({
          id: response.id,
          username: response.username,
          account: response.account,
          cardList: response.cardList,
          email: response.email,
          lastName: response.lastName,
          surName: response.surName,
        }));
        navigate('/menu');
        toast.success('Transaction done');
      });
  }

  function buyCard(id) {
    const context = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: user.id, card_id: id }),
    };
    fetch(`${process.env.REACT_APP_API_URL}/store/buy`, context)
      .then((response) => {
        if (response.status === 200) return response.text();
        throw new Error('error pls try again');
      })
      .then((data) => refreshUser(data === 'true', true))
      .catch((error) => toast.error(error.toString()));
  }

  function sellCard(id) {
    const context = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: user.id, card_id: id }),
    };
    fetch(`${process.env.REACT_APP_API_URL}/store/sell`, context)
      .then((response) => {
        if (response.status === 200) return response.text();
        throw new Error('error pls try again');
      })
      .then((data) => refreshUser(data === 'true'))
      .catch((error) => toast.error(error.toString()));
  }

  useEffect(() => {
    if (!user.id) {
      navigate('/auth');
    }

    if (user.id && mode === 'buy') {
      let context = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      if (!cards) {
        fetch(`${process.env.REACT_APP_API_URL}/cards_to_sell/`, context)
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            }
            throw new Error('error, pls try again');
          })
          .then((response) => {
            context = {
              method: 'GET',
            };
            setCards(response);
          })
          .catch((error) => toast.error(error.toString()));
      }
    } else if (user.id && mode === 'sell') {
      let context = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (!cards) {
        fetch(`${process.env.REACT_APP_API_URL}/cards/`, context)
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            }
            throw new Error('error, pls try again');
          })
          .then((response) => {
            context = {
              method: 'GET',
            };
            const userCards = response.filter((c) => user.cardList.includes(c.id));
            setCards(userCards);
          })
          .catch((error) => toast.error(error.toString()));
      }
    }
  }, []);

  return (
    <div className="marketContainer">
      <div className="cardTableContainer">
        <div className="cardTable">
          <Card
            display_type="SHORT"
            data={{
              id: 'ID',
              name: 'NAME',
              price: 'PRICE',
              description: 'DESCRIPTION',
              family: 'FAMILY',
              affinity: 'AFFINITY',
              hp: 'STATS',
              energy: '',
            }}
            header
          />
          {cards && cards.map((item, index) => (
            <Card
              key={item.id}
              dark={index % 2 === 0}
              display_type="SHORT"
              data={item}
              onClick={() => setSelecedCard(item)}
            />
          ))}
        </div>
      </div>
      <div className="cardDetailsContainer">
        {selectedCard && (
        <>
          <Card display_type="FULL" data={selectedCard} />
          <Button onClick={() => {
            if (mode === 'buy') buyCard(selectedCard.id);
            else sellCard(selectedCard.id);
            if (mode === 'buy') buyCard();
            else sellCard();
          }}
          >
            {' '}
            {mode === 'buy' ? 'Buy' : 'Sell'}
            {' '}
          </Button>
        </>
        )}
      </div>
    </div>
  );
}

export default MarketComponent;
