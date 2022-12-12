import React from 'react';
import UserMoney from '../components/UserMoney'
import UserAvatar from '../components/UserAvatar'


const MONEY='MONEY';
const AVATAR='AVATAR';
const HOME='HOME'


const User=(props)=> {

    let display="";
    switch(props.display_type){
        case AVATAR:
            display = (                
                <UserAvatar 
                    surname = {props.surname}
                    lastname = {props.lastname}
                    img_src = {props.img_src}
                    id = {props.id}
                    >
                </UserAvatar>
            );
            break;

        case MONEY:
            display=(                
                <UserMoney
                    solde = {props.solde}>
                </UserMoney>
            );
            break;

        case HOME:
            display = (                
                <UserAvatar 
                    >
                </UserAvatar>
            );
            break;
        
        default:
            display=(<h4>No Display Available</h4>);
    }
        return display;
}
export default User
