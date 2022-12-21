import React, { useState } from 'react';
import Battle from './components/Battle';
import ChooseCard from './components/ChooseCard';
import Wait from './components/Wait';

export default function Fight() {
  const components = { chooseCard: 'chooseCard', wait: 'wait', battle: 'battle' };
  const [currentComponent, setCurrentComponent] = useState(components.chooseCard);

  return (
    <>
      {currentComponent === components.chooseCard && (
        <ChooseCard setCurrentComponent={setCurrentComponent} components={components} />
      )}
      {currentComponent === components.wait && (
        <Wait setCurrentComponent={setCurrentComponent} components={components} />
      )}
      {currentComponent === components.battle && (
        <Battle setCurrentComponent={setCurrentComponent} components={components} />
      )}
    </>
  );
}
