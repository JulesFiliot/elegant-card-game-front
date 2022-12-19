import React, { useState } from 'react';
import ChooseCard from './components/ChooseCard';
import Wait from './components/Wait';

export default function Fight() {
  const components = { chooseCard: 'chooseCard', wait: 'wait' };
  const [currentComponent, setCurrentComponent] = useState(components.chooseCard);

  return (
    <div>
      {currentComponent === components.chooseCard && (
        <ChooseCard setCurrentComponent={setCurrentComponent} components={components} />
      )}
      {currentComponent === components.wait && (
        <Wait setCurrentComponent={setCurrentComponent} components={components} />
      )}
    </div>
  );
}
