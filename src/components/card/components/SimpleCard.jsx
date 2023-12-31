import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './SimpleCard.css';

function SimpleCard({
  hp, imgUrl, name, energy, description, price, family, affinity, id, hidePrice, defence, attack,
}) {
  return (
    <Card className="detailedCardContainer">
      <Image className="coverImg" src={imgUrl} wrapped ui={false} />
      <Card.Content>
        <div className="headerContent">
          <span>{name}</span>
          <span>{`#${id}`}</span>
        </div>
        <div className="separator" />
        <div className="description">
          <span>{description}</span>
          <div className="separator" />
          <span style={{ marginBottom: '5px' }}>STATS</span>
          <span>{`HP: ${hp}`}</span>
          <span>{`Energy: ${energy}`}</span>
          <span>{`Attack: ${attack}`}</span>
          <span>{`Defence: ${defence}`}</span>
          <span>{`Family: ${family}`}</span>
          <span>{`Affinity: ${affinity}`}</span>
        </div>
      </Card.Content>
      {!hidePrice && (
      <Card.Content extra>
        <button className="priceButton" type="button">
          <Icon name="money bill alternate outline" />
          {' '}
          {price}
          {' '}
          $
        </button>
      </Card.Content>
      )}
    </Card>
  );
}

export default SimpleCard;
