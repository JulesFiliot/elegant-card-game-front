import UserMoney from './components/user/components/UserMoney';
import UserAvatar from './components/user/components/UserAvatar';
import React from 'react';
import User from './components/user/containers/user'
import LineCard from './components/card/components/LineCard';
import SimpleCard from './components/card/components/SimpleCard';
import Card from './components/card/containers/Card';
import Navbar  from './components/Navbar/Navbar';
import MarketComponent from './components/market/components/MarketComponent';

function App() {
  return (
    <div className="App">
      <Navbar display_type='AVATAR' surname="Jonnhy" lastname= "Jonnhy" id={1} solde={10000000000} />
      <MarketComponent data={{
        id: 1,
        img_src: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
        name: "coucou",
        price: 1000,
        energy: 10,
        family: 'simians',
        affinity: "normal",
        hp: 10,
        description: "Un simple humain, il a l'air plutôt faible.",
        sellorbuy: "BUY"
      }}
      />
    </div>
  );
}

export default App;