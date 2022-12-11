import React from 'react';
import Card from '../../card/containers/Card';
import { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
//import { Card, Image, Icon } from 'semantic-ui-react'
//import 'semantic-ui-css/semantic.min.css'

//WIP



const MarketComponent = (props) => {
    const user = useSelector(state=>state.myUserReducer.user);
    const navigate = useNavigate();
    useEffect( () => {
        if (!user.id){
            console.log('toauth')
            navigate("/auth");
        }
    });

    const [cards, setCards]=useState("");
    console.log(props)
    console.log(props.mode=="buy")
    if (user.id && props.mode=="buy"){
        console.log('buy mode selected')
        let context = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if (!cards) {
            fetch('http://tp.cpe.fr:8083/cards_to_sell/',context)
            .then(response => {
            console.log("ooo:",response.status)
            if (response.status == '200'){
                //alert('good')
                return response.json()
    //                console.log(response.json())
            } else {
                throw('error, pls try again')
            }
        })
        .then((response) => {
            //alert(response)
            console.log(response)
            //fetch user info thx to id
            context = {
                method: 'GET'
            }
            setCards(response);
        })
            .catch(error => alert(error));
        }
    }
    else if (user.id && props.mode == "sell") {
        console.log('eeeee')
        let context = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        if (!cards) {
            fetch('http://tp.cpe.fr:8083/cards/',context)
            .then(response => {
            console.log("ooo:",response.status)
            if (response.status == '200'){
                //alert('good')
                return response.json()
    //                console.log(response.json())
            } else {
                throw('error, pls try again')
            }
            
        })
        .then((response) => {
            //alert(response)
            //console.log(response)
            //fetch user info thx to id
            context = {
                method: 'GET'
            }
            console.log(user.cardList)
            console.log(response)
            let userCards = [];
            for (const cardId of user.cardList){
                console.log(cardId)
                const found = response.find(el => el.id === cardId);
                userCards.push(found)
            }
            console.log("userCards:")
            console.log((userCards))

            setCards(userCards);
        })
            .catch(error => alert(error));
        }
    }

    function buyCard(id) {
        console.log(id)
    }
    

    return (
    
    <div>
        <div>
            {cards && cards.map(function(item) {
                return <li key={item.id}><Card display_type='SHORT' data={item} /><Card display_type='FULL' data={item}/><Button onClick={buyCard(item.id)}> Buy </Button></li>;
            })}
        </div>
    </div>
    
    )};

export default MarketComponent;