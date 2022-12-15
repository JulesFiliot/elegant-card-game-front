import React from 'react';
import './LineCard.css';

export default function LineCard({
  id, name, price, description, family, affinity, hp, energy, dark, header, onClick, hidePrice,
}) {
  return (
    <div
      className={`lineCardContainer${dark ? ' dark' : ''}${header ? ' header' : ''}`}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="col">{id}</div>
      <div className="col">{name}</div>
      <div className="col">
        {description}
      </div>
      {!hidePrice && (<div className="col">{price}</div>)}
      <div className="col">{family}</div>
      <div className="col">{affinity}</div>
      <div className="col stats" style={{ borderRight: 'solid 1px #000000' }}>
        {!header ? (
          <>
            <span>
              HP:
              {' '}
              {hp}
            </span>
            <span>
              Energy:
              {' '}
              {energy}
            </span>
          </>
        ) : (<span>{hp}</span>)}
      </div>
    </div>
  );
}
