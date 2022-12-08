import React from 'react';
import {MarketComponents} from '../components/SimpleCard';

//import { useDispatch, useSelector } from "react-redux";



const FULL_LABEL='FULL';
const SHORT_LABEL='SHORT';

/*
 export const User=(props)=> {
    let current_card = useSelector(state => state.userReducer.user);
*/


let display="";
switch(props.display_type){
    case SHORT_LABEL:
        display = (                
            <lineCard 
            id = {current_card.id}
            name = {current_card.name}
            description = {current_card.description}
            price = {current_card.price}
            family = {current_card.family}
            affinity = {current_card.affinity}
            hp = {current_card.hp}
            energy = {current_card.energy}> 
            </lineCard>
        );

        break;
    case FULL_LABEL:
        display=(                
            <simpleCard 
                id = {current_card.id}
                img_src = {current_card.img_src}
                name = {current_card.name}
                description = {current_card.description}
                price = {current_card.price}
                family = {current_card.family}
                affinity = {current_card.affinity}
                hp = {current_card.hp}
                energy = {current_card.energy}> 
            </simpleCard>
        );
        break;
    default:
        display=(<h4>No Display Available</h4>);
}
    return display;
