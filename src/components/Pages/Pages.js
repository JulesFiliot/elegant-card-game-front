import React,{useState} from 'react';

export const Pages = (props)=> {
    return (
        <div>
            <h5>Pages</h5>
            <button class="btn btn-primary" onClick={()=>props.handleSetPage('buy')}>Buy</button>
            <button class="btn btn-primary" onClick={()=>props.handleSetPage('sell')}>Sell</button>
            <button class="btn btn-primary" onClick={()=>props.handleSetPage('play')}>Play</button>
        </div>
    )
}