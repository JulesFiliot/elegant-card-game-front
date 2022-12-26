import React, { useState, useEffect, useContext } from 'react';
import { Icon } from 'semantic-ui-react';
import Dropdown from 'react-bootstrap/Dropdown';
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
  const [sendTo, setSendTo] = useState(user2);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const sender = { me: 'ME', other: 'OTHER' };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input === '') return;
    setMessages([...messages, { content: input, sender: sender.me }]);
    setInput('');
    socket.emit('chat message', JSON.stringify({ message: input, receveur: sendTo.id, emetteur: user1.id }));
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
    socket.on('refresh connected users', (users) => setConnectedUsers(users.filter((u) => u.id !== user1.id)));
    socket.on('conversation', (conv) => {
      console.log({ conv });
      if (conv.length) {
        setMessages(conv.map((c) => (
          { content: c.content, sender: c.id_emetteur === user1.id ? sender.me : sender.other }
        )));
      }
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('Reponse');
      socket.off('refresh connected users');
      socket.off('conversation');
      socket.emit('userDisconnected', user1.id);
    };
  }, []);

  useEffect(() => {
    socket.emit('getConversation', `${sendTo.id < user1.id ? `${sendTo.id}_${user1.id}` : `${user1.id}_${sendTo.id}`}`);
  }, [sendTo]);

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <div className="info">
          <span>Chat with</span>
          <Dropdown className="users-list-dropdown">
            <Dropdown.Toggle>
              {`${sendTo.surName}`}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {connectedUsers.map((u) => (
                <Dropdown.Item key={u.id} onClick={() => setSendTo(u)}>{`${u.surName} ${u.lastName}`}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Icon className={`dot circle${isConnected ? ' green' : ' red'}`} />
        </div>
      </div>
      <ul>
        {messages.map((message, i) => {
          const isSenderMe = message.sender === sender.me;
          return (
            // eslint-disable-next-line react/no-array-index-key
            <li key={i} className={`${isSenderMe ? 'me' : 'other'}`}>
              <span className={`user-name${isSenderMe ? ' me' : ' other'}`}>
                {isSenderMe ? `${user1.surName}:` : `${sendTo.surName}:`}
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
