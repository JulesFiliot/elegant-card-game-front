import React from 'react';
import socketio from 'socket.io-client';

export const socket = socketio.connect(process.env.REACT_APP_CHAT_URL);
export const SocketContext = React.createContext();
