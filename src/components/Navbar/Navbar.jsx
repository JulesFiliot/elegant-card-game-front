import React from 'react';
import Nav from 'react-bootstrap/Button';
import User from '../user/containers/user';
import setPage from  '../'
import 'bootstrap/dist/css/bootstrap.css';


const Navbar=(props) =>{
    return (
        <Nav>
          <Nav.Item>
            <User display_type='MONEY' solde={10000000000}/>
          </Nav.Item>
          <Nav.Item>
            <a class="btn btn-primary" aria-current="page" href="" onClick={()=>setPage("pages")} >Home</a>
          </Nav.Item>
          <Nav.Item>
            <User display_type='AVATAR' surname="Jonnhy" lastname= "Jonnhy" id={1} />
          </Nav.Item>

        </Nav>
      );
    }

export default Navbar;