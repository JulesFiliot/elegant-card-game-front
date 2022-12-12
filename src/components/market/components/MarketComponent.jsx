import React from 'react';
import Card from '../../card/containers/Card';
import { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { userUpdate } from '../../../core/actions';



const MarketComponent = (props) => {
    const dispatch = useDispatch()
    const user = useSelector(state=>state.myUserReducer.user);
    const [cards, setCards]=useState("");
    const navigate = useNavigate();
    const [i, setI] = useState(0);

    useEffect( () => {
        console.log(i)
        if (!user.id){
            console.log('toauth')
            navigate("/auth");
        }

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
                    return response.json()
                } else {
                    throw('error, pls try again')
                }
            })
            .then((response) => {
                console.log(response)
                context = {
                    method: 'GET'
                }
                setCards(response);
            })
                .catch(error => alert(error));
            }
        }
        else if (user.id && props.mode == "sell") {
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
                    return response.json()
                } else {
                    throw('error, pls try again')
                }
                
            })
            .then((response) => {
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
    }, [i]);
    

    function refreshUser() {
        fetch('http://tp.cpe.fr:8083/user/'+user.id,{method: 'GET'}).then(
                response => {
                    if (response.status == '200'){
                        return response.json()
                    } else {
                        throw('error fetching user')
                    }
                }
            )
            .then((response) => {
                dispatch(userUpdate({id:response.id,username:response.username,account:response.account,cardList:response.cardList,email:response.email,lastName:response.lastName,surName:response.surName}));
                navigate('/menu');
                alert("Transaction done")
            })
    }

    function buyCard(id) {
        let context = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id:user.id,card_id:id})
        }
        fetch('http://tp.cpe.fr:8083/store/buy',context).then(response => {
            console.log("ooo:",response.status)
            if (response.status == '200'){
                refreshUser()
                return response.json()
            } else {
                throw('error, pls try again')
            }
        }).catch(error => alert(error));
    }
    
    function sellCard(id) {
        let context = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id:user.id,card_id:id})
        }
        fetch('http://tp.cpe.fr:8083/store/sell',context).then(response => {
            console.log("ooo:",response.status)
            if (response.status == '200'){
                refreshUser()
                return response.json()
            } else {
                throw('error, pls try again')
            }
        }).catch(error => alert(error));
    }

    return (
    
    <div>
        <div>
            {cards && cards.map(function(item) {
                return <li key={item.id}><Card display_type='SHORT' data={item} /><Card display_type='FULL' data={item}/>
                <Button onClick={()=>{props.mode=='buy'?buyCard(item.id):sellCard(item.id)}}> {props.mode=='buy'?'Buy':'Sell'} </Button>
                </li>;
            })}
        </div>
    </div>
    
    )};

export default MarketComponent;