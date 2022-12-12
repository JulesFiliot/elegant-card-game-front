import React from 'react';
import './LineCard.css';

 export const LineCard = ({id, name, price, description, family, affinity, hp, energy }) => {
    return (
        <div className="lineCardContainer">
            <div className="col">{id}</div>
            <div className="col">{name}</div>
            <div className="col" style={{ width: '300px' }}>{description}</div>
            <div className="col">{price}</div>
            <div className="col">{family}</div>
            <div className="col">{affinity}</div>
            <div className="col" style={{ borderRight: 'solid 1px #000000' }}><ul><li>{hp}</li><li>{energy}</li></ul></div>
        </div>
       );
    };
export default LineCard;
