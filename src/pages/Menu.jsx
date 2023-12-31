import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Menu.css';

export default function Menu() {
  const user = useSelector((state) => state.myUserReducer.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.id) {
      navigate('/auth');
    }
  });
  return (
    <div className="menuContainer">
      <div className="links">
        <h1>Menu</h1>
        <NavLink className="btn btn-primary" to="/buy">Buy</NavLink>
        <NavLink className="btn btn-primary" to="/sell"> Sell</NavLink>
        <NavLink className="btn btn-primary" to="/fight"> Fight</NavLink>
      </div>
    </div>
  );
}
