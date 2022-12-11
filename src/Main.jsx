import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import { BrowserRouter,  Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/exports"
import { userUpdate } from "./core/actions"
import { Menu } from './pages/Menu';
import { Auth } from './pages/Auth';
import SimpleCard from './components/card/components/SimpleCard';

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
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="" onClick={()=>setPage("pages")} >Home</a>
              </li>
              <li className="nav-item">
                <div className="nav-link disabled">UserAvatar</div>
              </li>
              <li className="nav-item">
                <div className="nav-link disabled">{user?JSON.stringify(user):(<div>no user</div>)}</div>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">page</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <BrowserRouter>
        <div>
            <Routes>
                <Route path='/menu' element={<Menu/>} />
                <Route path='/' element={<Menu/>} />
                <Route path='/buy' element={<SimpleCard/>} />
                <Route path='/auth' element={<Auth/>} />
            </Routes>
        </div>

      </BrowserRouter>
      
    </div>
  );
};
