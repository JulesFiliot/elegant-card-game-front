import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { userUpdate } from '../../core/actions';
import './Navbar.css';

function Navbar() {
  const user = useSelector((state) => state.myUserReducer.user);
  const dispatch = useDispatch();
  return (
    <nav className="navbarContainer">
      <a className="navbarTitle" href="/menu">Elegant Card Game</a>
      {user.id && (
        <div className="navMenu">
          <NavLink className="btn btn-primary" to="/menu">Menu</NavLink>
          <NavLink className="btn btn-primary" to="/auth" onClick={() => dispatch(userUpdate({}))}>Sign out</NavLink>
        </div>
      )}
      <div className="userInfo">
        {user && (<span>{user.surName}</span>)}
        {user.id && (<span>{`${user.account} $`}</span>)}
      </div>
    </nav>
  );
}

export default Navbar;
