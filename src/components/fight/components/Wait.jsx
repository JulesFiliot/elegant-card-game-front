import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setFightCards } from '../../../core/actions';
import Loader from '../../card/components/Loader';
import './Wait.css';

export default function Wait({ setCurrentComponent, components }) {
  const disptach = useDispatch();
  const user = useSelector((state) => state.myUserReducer.user);
  const fightCards = useSelector((state) => state.myUserReducer.fightCards);

  const cancelSearch = () => {
    disptach(setFightCards([]));
    setCurrentComponent(components.chooseCard);
    // todo cancel opponent search + toast => do this in function
  };

  const handleBeforeUnload = () => {
    console.log('before unload');
    cancelSearch();
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };

  useEffect(() => console.log({ fightCards }), [fightCards]);
  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    const context = {
      method: 'GET',
    };
    fetch(`${process.env.REACT_APP_POOL_URL}/pool/${user.id}`, context)
      .then((response) => {
        if (!response.ok) throw new Error('Something went wrong while entring the pool');
        toast.success('You\'re in the pool, please wait!');
      })
      .catch((err) => {
        setCurrentComponent(components.chooseCard);
        toast.error(err.toString());
      });
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
        onClick={() => setCurrentComponent(components.chooseCard)}
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
    </div>
  );
}
