import React from 'react';
import SimpleCard from '../components/SimpleCard';
import LineCard from '../components/LineCard';
//import { useDispatch, useSelector } from "react-redux";



const FULL_LABEL='FULL';
const SHORT_LABEL='SHORT';


 const Card=(props)=> {
    //let current_card = useSelector(state => state.userReducer.user);
    let display="";
    switch(props.display_type){
        case SHORT_LABEL:
            display = (                
                <LineCard 
                id = {props.id}
                name = {props.name}
                description = {props.description}
                price = {props.price}
                family = {props.family}
                affinity = {props.affinity}
                hp = {props.hp}
                energy = {props.energy}> 
                </LineCard>
            );

            break;
        case FULL_LABEL:
            display=(                
                <SimpleCard 
                    id = {props.id}
                    img_src = {props.img_src}
                    name = {props.name}
                    description = {props.description}
                    price = {props.price}
                    family = {props.family}
                    affinity = {props.affinity}
                    hp = {props.hp}
                    energy = {props.energy}> 
                </SimpleCard>
            );
            break;
        default:
            display=(<h4>No Display Available</h4>);
    }
    return display;
}

export default Card;