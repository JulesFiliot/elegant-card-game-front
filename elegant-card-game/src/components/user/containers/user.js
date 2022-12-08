import React from 'react';
import {UserSimpleDisplay} from '../components/UserSimpleDisplay';
import {UserShortDisplay} from '../components/UserShortDisplay';
import { current } from '@reduxjs/toolkit';
import { SimpleUser } from '../components/SimpleUser';
//import { useDispatch, useSelector } from "react-redux";



const FULL_LABEL='FULL';
const SHORT_LABEL='SHORT';
const SHORT_SHORT_LABEL='SHORT_SHORT';

/*
 export const User=(props)=> {
    let current_card = useSelector(state => state.userReducer.user);
*/


    let display="";
    switch(props.display_type){
        case SHORT_LABEL:
            display = (                
                <SimpleUser 
                    surname = {current_card.surname}
                    lastname = {current_card.lastname}
                    img = {current_card.img}
                    money = {current_card.money}> 
                </SimpleUser>
            );
            break;

        case FULL_LABEL:
            display=(                
                <UserSimpleDisplay 
                    id = {current_card.id}
                    img_src = {/public/favicon.ico}
                    surname = {current_card.surname}
                    lastname = {current_card.lastname}
                    login = {current_card.login}
                    pwd = {current_card.pwd}
                    money = {current_card.money}
                    img = {current_card.img}> 
                </UserSimpleDisplay>
            );
            break;

        case SHORT_SHORT_LABEL:
            display = (                
                <UserShortDisplay 
                    surname = {current_user.surname}
                    img = {current_user.img}
                    id = {current_user.id}>
                </UserShortDisplay>
            );

            break;
        default:
            display=(<h4>No Display Available</h4>);
    }
        return display;
