import React, { useState, useEffect, useContext } from 'react';
import { Icon } from 'semantic-ui-react';
import { SocketContext } from '../../../context/socket';
import 'bootstrap/dist/css/bootstrap.css';
import './ChatPanel.css';

// user1 sending messages to user2
// user1 receiving messages from user2
export default function ChatPanel({ user1, user2 }) {
  const socket = useContext(SocketContext);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const sender = { me: 'ME', other: 'OTHER' };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input === '') return;
    setMessages([...messages, { content: input, sender: sender.me }]);
    setInput('');
    socket.emit('chat message', JSON.stringify({ message: input, receveur: user2.id, emetteur: user1.id }));
  };

  useEffect(() => {
    // send user id to server
    socket.emit('userConnection', user1.id);
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
    });
    socket.on('Reponse', (msg) => setMessages((oldMsg) => [...oldMsg, { content: msg, sender: sender.other }]));

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('Reponse');
    };
  }, []);

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <div>
          Chat with
          {' '}
          <span className="username">{user2.surName}</span>
        </div>
        {' '}
        <Icon className={`dot circle${isConnected ? ' green' : ' red'}`} />
      </div>
      <ul>
        {messages.map((message, i) => {
          const isSenderMe = message.sender === sender.me;
          return (
            // eslint-disable-next-line react/no-array-index-key
            <li key={i} className={`${isSenderMe ? 'me' : 'other'}`}>
              <span className={`user-name${isSenderMe ? ' me' : ' other'}`}>
                {isSenderMe ? `${user1.surName}:` : `${user2.surName}:`}
              </span>
              {message.content}
            </li>
          );
        })}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button className="btn btn-primary" type="submit">Send</button>
      </form>
    </div>
  );
}
