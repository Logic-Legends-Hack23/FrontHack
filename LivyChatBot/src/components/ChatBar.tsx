import React, { useState } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SendIcon from '@mui/icons-material/Send';

export default function ChatBar() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Agregar el mensaje al arreglo de mensajes
    setMessages([...messages, message]);
    setMessage(''); // Borrar el mensaje del input
  };

  return (
    <div style={{ position: 'fixed', bottom: '0', right: '0', width: '100%' }}>
      <div style={{ backgroundColor: 'white', padding: '1rem' }}>
        <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', padding: '1rem' }}>
          {messages.map((msg, index) => (
            <div key={index} style={{ borderRadius: '1rem', padding: '0.5rem', alignSelf: 'flex-end', marginBottom: '1rem' }}>
              {msg}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
          <button type="button" style={{ backgroundColor: 'rgba(225, 0, 152, 0.18)', borderRadius: '1rem', padding: '1rem' }}>
            <CameraAltIcon />
          </button>
          <input
            type="text"
            value={message}
            onChange={handleMessageChange}
            placeholder="Habla con Livy"
            style={{ flex: 1, borderRadius: '0.5rem', padding: '1rem', marginLeft: '0.5rem', marginRight: '0.5rem', backgroundColor: 'rgba(225, 0, 152, 0.18)' }}
          />
          <button type="submit" style={{ backgroundColor: 'rgba(225, 0, 152, 0.18)', borderRadius: '1rem', padding: '1rem' }}>
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
}
