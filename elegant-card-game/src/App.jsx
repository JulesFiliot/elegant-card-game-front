import './App.css';
import SimpleUser from './components/user/components/SimpleUser';
import React from 'react';
import LineCard from './components/card/components/LineCard';
import SimpleCard from './components/card/components/SimpleCard';

function App() {
  return (
    <div className="App">
      <SimpleCard img_src='https://cdn.icon-icons.com/icons2/896/PNG/512/pokemon_go_play_game_cinema_film_movie_icon-icons.com_69163.png' name="coucou" price={1000} />
    </div>
  );
}

export default App;
