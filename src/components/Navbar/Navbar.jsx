import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useSelector } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userUpdate } from "../../core/actions"


const Navbar=(props) =>{
    const user = useSelector(state=>state.myUserReducer.user);
    const dispatch = useDispatch()
    return (
      <Container>
      <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Elegant Card Game</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user?
            <li className="nav-item">
              <div className="nav-link disabled">{user.surName}</div>
            </li>:''
            }
            {user.id?
            <li className="nav-item">
              <div className="nav-link disabled">{user.account} €</div>
            </li>:''
            }
            <li>
            {user.id ? <div>
        <NavLink className="btn btn-primary" to="/menu">Menu</NavLink>
        <NavLink className="btn btn-primary" to="/auth" onClick={()=>{dispatch(userUpdate({}))}}>Sign out</NavLink>
    </div> : ""}
            </li>
          </ul>
        </div>
      </div>
    </nav>
   

</Container>
      );
    }

export default Navbar;