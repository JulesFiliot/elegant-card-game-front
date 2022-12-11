import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import { Pages } from './components/Pages/Pages';
import SimpleCard from './components/card/components/SimpleCard';
import User from './components/user/containers/user'

export const Main = () => {
  const [i, setI]=useState("");

  const [page, setPage]=useState("pages");
  //setPage('pages');
  //const [v,setV]=useState("");
  useEffect( () => {
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
  }

  function handleSetPage(new_page) {
    console.log('ok',new_page)
    setPage(new_page)
  }
  

  const pages = {
    "pages":(
      <Pages handleSetPage={handleSetPage} />
    ),
    "buy":(
      <SimpleCard img_src='https://cdn.icon-icons.com/icons2/896/PNG/512/pokemon_go_play_game_cinema_film_movie_icon-icons.com_69163.png' name="coucou" price={1000} />
    ),
    "auth":
    (<></>)
  }; 

  let currentPage="";
  switch(page){
    case 'pages':
      currentPage=(<Pages handleSetPage={handleSetPage} />);
      break;
    case 'buy':
      currentPage=(<SimpleCard img_src='https://cdn.icon-icons.com/icons2/896/PNG/512/pokemon_go_play_game_cinema_film_movie_icon-icons.com_69163.png' name="coucou" price={1000} />);
      break;
  }

  /*pages = (
    <div style={{display:page?'none':'default'}}>
      <Pages handleSetPage={handleSetPage} />
    </div>
  );*/

  return (
    <div className="Main">
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <User display_type='MONEY' solde={10000000000}/>
              </li>
              <li class="nav-item">
                <a class="btn btn-primary" aria-current="page" href="" onClick={()=>setPage("pages")} >Home</a>
              </li>
              <li class="nav-item">
                <User display_type='AVATAR' surname="Jonnhy" lastname= "Jonnhy" id={1} />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {pages[page]}         
    </div>
  );
};
