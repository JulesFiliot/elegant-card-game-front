import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './ChatPanel.css';

export default function ChatPanel({ otherUser }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const sender = { me: 'ME', other: 'OTHER' };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessages([...messages, { id: 1, content: input, sender: sender.me }]);
    setInput('');
  };

  return (
    <div className="chat-panel">
      <ul>
        {messages.map((message) => {
          const isSenderMe = message.sender === sender.me;
          return (
            <li key={message.id} className={`${isSenderMe ? 'me' : 'other'}`}>
              <span className={`user-name${isSenderMe ? ' me' : ' other'}`}>
                {isSenderMe ? 'Me:' : `${otherUser}:`}
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
