import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './SimpleCard.css';
import './BattleCard.css';

function BattleCard({
  hp, imgUrl, name, energy, id, selected, onClick, attack, defence, isOpponent, disabled,
}) {
  return (
    <Card
      className={`detailedCardContainer tiny battleCard${selected ? ` selected${isOpponent ? ' opponent' : ''}` : ''}${disabled ? ' disabled' : ''}`}
      onClick={!disabled ? onClick : null}
    >
      <Image className="coverImg tiny" src={imgUrl} wrapped ui={false} />
      <Card.Content>
        <div className="headerContent">
          <span>{name}</span>
          <span>{`#${id}`}</span>
        </div>
        <div className="separator" />
        <div className="description">
          <span style={{ marginBottom: '5px', fontWeight: 'bold' }}>STATS</span>
          <span style={{ color: `${hp <= 0 ? '#fd2f2f' : '#00a000'}` }}>{`HP: ${hp}`}</span>
          <span>{`Energy: ${energy}`}</span>
          <span>{`Attack: ${attack}`}</span>
          <span>{`Defence: ${defence}`}</span>
        </div>
      </Card.Content>
    </Card>
  );
}

export default BattleCard;
