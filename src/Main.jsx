import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import { BrowserRouter,  Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/exports"
import { userUpdate } from "./core/actions"
import { Menu } from './pages/Menu';
import { Auth } from './pages/Auth';
import SimpleCard from './components/card/components/SimpleCard';
import MarketComponent from './components/market/components/MarketComponent';
import Navbar from './components/Navbar/Navbar';
import { Link } from 'react-router-dom';

export const Main = () => {
  let dispatch=useDispatch();

  const user = useSelector(state=>state.myUserReducer.user);
  const [i, setI]=useState("");

  const [page, setPage]=useState("auth");
  
  //setPage('pages');
  //const [v,setV]=useState("");
  /*useEffect( () => {
    //setPage("pages")
    let context = {method: 'GET'}
    fetch('http://tp.cpe.fr:8083/users',context)
    .then(response => response.json())
    .then((response) => {
      //alert(response)
      console.log(response);
    })
    .catch(error => alert(error));  
  }, [i])

  function onClick() {
    setI(i+1);
  }*/

  function handleSetPage(new_page) {
    console.log('ok',new_page)
    setPage(new_page)
  }
  
  return (
    <div className="Main">
      
      
      <BrowserRouter>
        <div>
        <Navbar></Navbar>
            <Routes>
                <Route index element={<Menu/>} />
                <Route path='/menu' element={<Menu/>} />
                <Route path='/' element={<Menu/>} />
                <Route path='/buy' element={<MarketComponent mode="buy"
      />} />
                <Route path='/sell' element={<MarketComponent mode="sell"
                />} />
                <Route path='/auth' element={<Auth/>} />
            </Routes>
        </div>

      </BrowserRouter>
      
    </div>
  );
};
