import React from 'react';
import SimpleCard from '../components/SimpleCard';
import LineCard from '../components/LineCard';
import BattleCard from '../components/BattleCard';

const FULL_LABEL = 'FULL';
const SHORT_LABEL = 'SHORT';
const BATTLE_CARD = 'BATTLE';

const Card = (props) => {
  let display = '';
  switch (props.display_type) {
    case SHORT_LABEL:
      display = (
        <LineCard
          id={props.data.id}
          name={props.data.name}
          description={props.data.description}
          price={props.data.price}
          family={props.data.family}
          affinity={props.data.affinity}
          defence={props.data.defence}
          attack={props.data.attack}
          hp={props.data.hp}
          energy={props.data.energy}
          dark={props.dark}
          header={props.header}
          onClick={props.onClick}
          hidePrice={props.hidePrice}
          disabled={props.disabled}
        />
      );
      break;
    case FULL_LABEL:
      display = (
        <SimpleCard
          id={props.data.id}
          imgUrl={props.data.imgUrl}
          name={props.data.name}
          description={props.data.description}
          price={props.data.price}
          family={props.data.family}
          affinity={props.data.affinity}
          hp={props.data.hp}
          energy={props.data.energy}
          defence={props.data.defence}
          attack={props.data.attack}
          dark={props.dark}
          hidePrice={props.hidePrice}
        />
      );
      break;
    case BATTLE_CARD:
      display = (
        <BattleCard
          id={props.data.id}
          imgUrl={props.data.imgUrl}
          name={props.data.name}
          description={props.data.description}
          price={props.data.price}
          family={props.data.family}
          affinity={props.data.affinity}
          defence={props.data.defence}
          attack={props.data.attack}
          hp={props.data.hp}
          energy={props.data.energy}
          dark={props.dark}
          hidePrice={props.hidePrice}
          onClick={props.onClick}
          selected={props.selected}
          isOpponent={props.isOpponent}
          disabled={props.disabled}
        />
      );
      break;
    default:
      display = (<h4>No Display Available</h4>);
  }
  return display;
};

export default Card;
