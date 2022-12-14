import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

function SimpleCard({
  hp, imgUrl, name, energy, description, price, family, affinity, id,
}) {
  return (
    <Card>
      <Image src={imgUrl} wrapped ui={false} />
      <Card.Content>
        <Card.Header>
          hp =
          {hp}
          {' '}
          {name}
          {' '}
          energy =
          {' '}
          {energy}
          {' '}
        </Card.Header>
        <Card.Description>
          {description}
        </Card.Description>
        Family :
        {' '}
        {family}
        {' '}
        Affinity :
        {affinity}
        {' '}
        id :
        {id}
      </Card.Content>
      <Card.Content extra>
        <button type="button">
          <Icon name="money bill alternate outline" />
          {price}
          {' '}
          $
        </button>
      </Card.Content>
    </Card>
  );
}

export default SimpleCard;
