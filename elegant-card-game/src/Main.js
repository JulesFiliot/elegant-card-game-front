import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import { Pages } from './components/Pages/Pages';

export const Main = () => {
  const [i, setI]=useState("");

  const [page, setPage]=useState("");

  //const [v,setV]=useState("");
  useEffect( () => {
    let context = {method: 'GET'}
    fetch('http://tp.cpe.fr:8083/users',context)
    .then(response => response.json())
    .then((response) => {
      alert(response)
      console.log(response);
    })
    .catch(error => alert(error));  
  }, [i])

  function onClick() {
    setI(i+1);
  }

  function handleSetPage(new_page) {
    console.log('ok',page)
    setPage(new_page)
  }
  
  const pages = (
    <div style={{display:page?'none':'default'}}>
      <Pages handleSetPage={handleSetPage} />
    </div>
  );

  return (
    <div className="Main">
      <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <div class="nav-link disabled">UserAvatar</div>
        </li>
        <li class="nav-item">
          <div class="nav-link disabled">UserMoney</div>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">{page}</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
      {pages}
      
    </div>
  );
};
