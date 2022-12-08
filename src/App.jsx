import UserMoney from './components/user/components/UserMoney';
import UserAvatar from './components/user/components/UserAvatar';
import React from 'react';
import User from './components/user/containers/user'
import LineCard from './components/card/components/LineCard';
import SimpleCard from './components/card/components/SimpleCard';
import Card from './components/card/containers/Card';
import Navbar  from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar display_type='AVATAR' surname="Jonnhy" lastname= "Jonnhy" id={1} solde={10000000000} />
    </div>
  );
}

export default App;