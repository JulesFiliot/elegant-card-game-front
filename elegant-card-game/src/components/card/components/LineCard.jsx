import React from 'react';
import './LineCard.css';

 export const LineCard = ({ name, price, white }) => {
    return (
        <div className="lineCardContainer">
            <div className="col">{name}</div>
            <div className="col">TEST</div>
            <div className="col" style={{ width: '300px' }}>TEST</div>
            <div className="col">TEST</div>
            <div className="col">TEST</div>
            <div className="col">TEST</div>
            <div className="col" style={{ borderRight: 'solid 1px #000000' }}>TEST</div>
        </div>






        /*
        <Card>
            <Image src = {props.img_src} wrapped ui = {false} />
            <Card.Content>
                <Card.Header>{props.hp} {props.name} {props.energy} </Card.Header>
                <Card.Description>
                    {props.description}
                </Card.Description>
                <Card.Footer>{props.affinity} {props.family}</Card.Footer>
            </Card.Content>
            <Card.Content extra>
                    <a>
                        <Icon name = 'money bill alternate outline' />
                            {props.price} $
                    </a>
            </Card.Content>
        </Card>
        */
       );
    };
export default LineCard;
