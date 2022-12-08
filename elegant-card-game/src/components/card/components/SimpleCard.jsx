import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const SimpleCard = ({hp, img_src, name, energy, description, price, family, affinity, id}) => (
    

        <Card>
            <Image src = {img_src} wrapped ui = {false} />
            <Card.Content>
                <Card.Header>hp = {hp} {name} eneryg = {energy} </Card.Header>
                <Card.Description>
                    {description}
                </Card.Description>
                Family : {family} Affinity : {affinity} id : {id}
            </Card.Content>
            <Card.Content extra>
                    <a>
                        <Icon name = "money bill alternate outline" />
                            {price} $
                    </a>
            </Card.Content>
        </Card>
    )

export default SimpleCard;
