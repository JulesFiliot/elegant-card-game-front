import React,{useState} from 'react';

export const Pages = (props)=> {
    return (
        <div>
            <h5>Pages</h5>
            <button class="btn btn-primary" onClick={()=>props.handleSetPage('Buy')}>Buy</button>
            <button class="btn btn-primary" onClick={()=>props.handleSetPage('Sell')}>Sell</button>
            <button class="btn btn-primary" onClick={()=>props.handleSetPage('Play')}>Play</button>
        </div>
    )
}