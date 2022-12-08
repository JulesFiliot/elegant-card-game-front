import SimpleUser from './components/user/components/SimpleUser';
import React from 'react';
import LineCard from './components/card/components/LineCard';
import SimpleCard from './components/card/components/SimpleCard';
import Card from './components/card/containers/Card';
import MarketComponent from './components/market/components/MarketComponent';

function App() {
  return (
    <div className="App">
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