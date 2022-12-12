import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { BrowserRouter,  Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/exports"
import { Menu } from './pages/Menu';
import { Auth } from './pages/Auth';
import MarketComponent from './components/market/components/MarketComponent';
import Navbar from './components/Navbar/Navbar';

export const Main = () => {
  let dispatch=useDispatch();

  const user = useSelector(state=>state.myUserReducer.user);
  const [i, setI]=useState("");

  const [page, setPage]=useState("auth");


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
