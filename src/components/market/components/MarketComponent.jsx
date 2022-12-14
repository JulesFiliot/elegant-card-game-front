import React, { useState, useEffect } from 'react';

import { Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '../../card/containers/Card';

import { userUpdate } from '../../../core/actions';

function MarketComponent({ mode }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.myUserReducer.user);
  const [cards, setCards] = useState('');
  const navigate = useNavigate();

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
          .catch((error) => alert(error));
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
          .catch((error) => alert(error));
      }
    }
  }, []);

  function refreshUser(isValid) {
    if (!isValid) {
      alert('Transaction failed: not enough money');
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
        alert('Transaction done');
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
        throw new Error('error, pls try again');
      })
      .then((data) => refreshUser(data === 'true'))
      .catch((error) => alert(error));
  }

  function sellCard(id) {
    const context = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: user.id, card_id: id }),
    };
    fetch(`${process.env.REACT_APP_API_URL}/store/sell`, context).then((response) => {
      if (response.status === 200) {
        refreshUser();
        return response.json();
      }
      throw new Error('error, pls try again');
    }).catch((error) => alert(error));
  }

  return (

    <div>
      <div>
        {cards && cards.map((item) => (
          <li key={item.id}>
            <Card display_type="SHORT" data={item} />
            <Card display_type="FULL" data={item} />
            <Button onClick={() => {
              if (mode === 'buy') buyCard(item.id);
              else sellCard(item.id);
            }}
            >
              {' '}
              {mode === 'buy' ? 'Buy' : 'Sell'}
              {' '}
            </Button>
          </li>
        ))}
      </div>
    </div>

  );
}

export default MarketComponent;
