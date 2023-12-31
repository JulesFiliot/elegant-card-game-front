import React from 'react';
import socketio from 'socket.io-client';

export const chatSocket = socketio.connect(process.env.REACT_APP_CHAT_URL, { path: '/chatws/' });
export const notifierSocket = socketio.connect(process.env.REACT_APP_NOTIFIER_URL, { path: '/notifierws/' });
export const SocketContext = React.createContext();
