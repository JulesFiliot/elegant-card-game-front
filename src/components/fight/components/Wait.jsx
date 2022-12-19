import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFightCards } from '../../../core/actions';
import Loader from '../../card/components/Loader';

export default function Wait({ setCurrentComponent, components }) {
  const disptach = useDispatch();
  const fightCards = useSelector((state) => state.myUserReducer.fightCards);

  useEffect(() => console.log({ fightCards }), [fightCards]);
  useEffect(() => () => {
    console.log('LEAVING');
    disptach(setFightCards([]));
    setCurrentComponent(components.chooseCard);
    // cancel opponent search + toast => do this in function
  }, []);

  return (
    <div className="waitingContainer">
      <Loader />
    </div>
  );
}
