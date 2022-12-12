import React,{ useEffect } from 'react';
import { Container } from 'semantic-ui-react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Menu = (props)=> {
    const user = useSelector(state=>state.myUserReducer.user);
    const navigate = useNavigate();
    useEffect( () => {
        if (!user.id){
            console.log('toauth')
            navigate("/auth");
        }
    })
    return (
        <Container>
            <div>
                <NavLink className="btn btn-primary" to="/buy">Buy</NavLink>
                <NavLink className="btn btn-primary" to="/sell"> Sell</NavLink>
            </div>
        </Container>
    )
}