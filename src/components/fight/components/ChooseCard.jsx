import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import toast from 'react-hot-toast';
import Card from '../../card/containers/Card';
import '../../market/components/MarketComponent.css';
import './ChooseCard.css';

export default function ChooseCard() {
  const userCardsIds = useSelector((state) => state.myUserReducer.user.cardList);
  const [selectedCard, setSelecedCard] = useState(null);
  const [cards, setCards] = useState(null);
  const [chosenCards, setChosenCards] = useState([]);

  const getCards = async () => (new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_URL}/cards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.json());
        }
        reject(new Error('error, pls try again'));
      });
  }));

  const addCardToTeam = (card) => {
    if (chosenCards.length < 5 && !chosenCards.find((c) => c.id === card.id)) {
      setChosenCards([...chosenCards, card]);
      setSelecedCard(null);
    } else {
      toast.error('Error: cannot add card');
    }
  };

  const removeCardFromTeam = (card) => {
    setChosenCards(chosenCards.filter((c) => c.id !== card.id));
  };

  useEffect(() => {
    getCards()
      .then((response) => {
        const userCards = response.filter((c) => userCardsIds.includes(c.id));
        setCards(userCards);
      })
      .catch((error) => toast.error(error.toString()));
  }, [userCardsIds]);

  useEffect(() => () => { console.log('LEAVING'); }, []);

  return (
    <div className="chooseCardContainer">
      <div className="chosenCards">
        <div className="title">chosen cards</div>
        <div className="cardsList">
          {chosenCards.length ? chosenCards.map((c) => (
            <div className="deleteOverlay">
              <Card
                key={c.id}
                display_type="FULL"
                data={c}
                hidePrice
              />
              <button
                className="btn removeBtn"
                type="button"
                onClick={() => removeCardFromTeam(c)}
              >
                REMOVE
              </button>
            </div>
          )) : (<div>PLEASE SELECT 5 CARDS</div>)}
        </div>
      </div>
      <div className="separator" />
      {chosenCards.length === 5 && (
        <>
          <button type="button" className="btn fightBtn">START FIGHT</button>
          <div className="separator" />
        </>
      )}
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
              hidePrice
            />
            {cards && cards.map((item, index) => (
              <Card
                key={item.id}
                dark={index % 2 === 0}
                display_type="SHORT"
                data={item}
                onClick={() => setSelecedCard(item)}
                hidePrice
                disabled={chosenCards.find((c) => c.id === item.id)}
              />
            ))}
          </div>
        </div>
        <div className="cardDetailsContainer">
          {selectedCard && (
          <>
            <Card display_type="FULL" data={selectedCard} hidePrice />
            <Button
              className="actionButton"
              onClick={() => addCardToTeam(selectedCard)}
            >
              ADD TO TEAM
            </Button>
          </>
          )}
        </div>
      </div>
    </div>
  );
}
