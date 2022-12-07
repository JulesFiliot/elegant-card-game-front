import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react'

 export const SimpleCard = ({hp, img_src, name, energy, description, price, family, affinity}) => {
    return (
        <Card>
            <Image src = {img_src} wrapped ui = {false} />
            <Card.Content>
                <Card.Header>{hp} {name} {energy} </Card.Header>
                <Card.Description>
                    {description}
                </Card.Description>
                {family} {affinity}
            </Card.Content>
            <Card.Content extra>
                    <a>
                        <Icon name = 'money bill alternate outline' />
                            {price} $
                    </a>
            </Card.Content>
        </Card>
        );
    }

export default SimpleCard;
