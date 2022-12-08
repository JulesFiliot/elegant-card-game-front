import SimpleUser from './components/user/components/SimpleUser';
import React from 'react';
import LineCard from './components/card/components/LineCard';
import SimpleCard from './components/card/components/SimpleCard';

function App() {
  return (
    <div className="App">
      <SimpleCard id={1} img_src='https://react.semantic-ui.com/images/avatar/large/matthew.png' name="coucou" price={1000} energy={10} family='simians' affinity="normal" hp={10} description="Un simple humain, il a l'air plutôt faible." />
    </div>
  );
}

export default App;
