import React from 'react';
import SimpleCard from '../components/SimpleCard';
import LineCard from '../components/LineCard';
//import { useDispatch, useSelector } from "react-redux";

<user display_type="MONEY"></user>

const FULL_LABEL='FULL';
const SHORT_LABEL='SHORT';


 const Card=(props)=> {
    //let current_card = useSelector(state => state.userReducer.user);
    let display="";
    switch(props.display_type){
        case SHORT_LABEL:
            display = (                
                <LineCard 
                id = {props.data.id}
                name = {props.data.name}
                description = {props.data.description}
                price = {props.data.price}
                family = {props.data.family}
                affinity = {props.data.affinity}
                hp = {props.data.hp}
                energy = {props.data.energy}> 
                </LineCard>
            );

            break;
        case FULL_LABEL:
            display=(                
                <SimpleCard 
                    id = {props.data.id}
                    img_src = {props.data.img_src}
                    name = {props.data.name}
                    description = {props.data.description}
                    price = {props.data.price}
                    family = {props.data.family}
                    affinity = {props.data.affinity}
                    hp = {props.data.hp}
                    energy = {props.data.energy}> 
                </SimpleCard>
            );
            break;
        default:
            display=(<h4>No Display Available</h4>);
    }
    return display;
}

export default Card;