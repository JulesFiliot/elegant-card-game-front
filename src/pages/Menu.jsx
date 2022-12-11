import React,{useState} from 'react';
import { Container } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';

export const Menu = (props)=> {
    return (
        <Container>
            <div>
                <NavLink className="btn btn-primary" to="/menu">Menu</NavLink>
                <NavLink className="btn btn-primary" to="/buy">Buy</NavLink>
                <NavLink className="btn btn-primary" to="/sell"> Sell</NavLink>
            </div>
        </Container>
    )
}