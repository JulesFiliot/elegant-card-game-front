import React from 'react';
import Loader from '../../card/components/Loader';

export default function Wait() {
  return (
    <div className="waitingContainer">
      <Loader />
    </div>
  );
}
