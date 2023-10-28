import React, { useState, useRef, useEffect } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import ReplyIcon from '@mui/icons-material/Reply';
import axios from 'axios';

export default function ChatBar() {
  const [message, setMessage] = useState('');
  const [userMessages, setUserMessages] = useState([]);
  const [livyMessages, setLivyMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);


  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Agregar el mensaje del usuario al arreglo de mensajes de usuario
    setUserMessages([...userMessages, { text: message, sentByUser: true }]);
    setMessage(''); 
    try {
      const response = await axios.post(
        'http://10.48.206.1:8000/text/',
        { text: message },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: false,
        }
      );
    
      const livyResponse = response.data.response; // Accede a la propiedad "response" para obtener el valor de texto
      setLivyMessages([...livyMessages, { text: livyResponse, sentByUser: false }]);
    } catch (error) {
      console.error('Error en la solicitud a la API:', error);
    }
  };

  // Combina los mensajes del usuario y de Livy para mostrarlos intercalados
  const combinedMessages = [];
  const maxMessages = Math.max(userMessages.length, livyMessages.length);
  for (let i = 0; i < maxMessages; i++) {
    if (userMessages[i]) {
      combinedMessages.push(userMessages[i]);
    }
    if (livyMessages[i]) {
      combinedMessages.push(livyMessages[i]);
    }
  }

  // Scrolls to the bottom of the messages when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [combinedMessages]);

  const userMessageStyle = {
    backgroundColor: 'rgba(225, 0, 152, 0.18)',
    padding: '0.5rem',
    borderRadius: '1rem',
    fontSize: '1.2rem',
    fontFamily: 'Inter, sans-serif',
    float: 'right',
    clear: 'both',
  };

  const livyMessageStyle = {
    backgroundColor: 'rgba(225, 0, 152, 0.18)',
    padding: '0.5rem',
    borderRadius: '1rem',
    fontSize: '1.2rem',
    fontFamily: 'Inter, sans-serif',
    float: 'left',
    clear: 'both',
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', left: '2rem', width: 'calc(100% - 4rem)', height: 'calc(80vh - 4rem)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: 'white', padding: '1rem', flex: 1, overflowY: 'auto', borderRadius: '1rem' }}>
        <div style={{ backgroundColor: 'white', padding: '1rem' }}>
        {combinedMessages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '1rem' }}>
            <div style={msg.sentByUser ? userMessageStyle : livyMessageStyle}>
              {msg.sentByUser && (
                <div style={{ float: 'right', marginLeft: '0.5rem' }}>
                  <PersonIcon />
                </div>
              )}
              {msg.text}
              {!msg.sentByUser && (
                <div style={{ float: 'left', marginRight: '0.5rem' }}>
                  <ReplyIcon />
                </div>
              )}
            </div>
          </div>
        ))}
          <div ref={messagesEndRef}></div>
        </div>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
      <label htmlFor="imageInput" style={{ backgroundColor: 'rgba(225, 0, 152, 0.18)', borderRadius: '1rem', padding: '1rem', cursor: 'pointer' }}>
        <CameraAltIcon />
      </label>
      <input
        type="file"
        id="imageInput"
        accept="image/*" 
        style={{ display: 'none' }}
        onChange={(event) => {
          if (event.target.files.length > 0) {
            setSelectedImage(event.target.files[0]);
          }
        }}
      />    
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Habla con Livy"
          style={{ flex: 1, borderRadius: '0.5rem', padding: '1rem', marginLeft: '1rem', marginRight: '1rem', backgroundColor: 'rgba(225, 0, 152, 0.18)' }}
        />
        <button type="submit" style={{ backgroundColor: 'rgba(225, 0, 152, 0.18)', borderRadius: '1rem', padding: '1rem' }}>
          <SendIcon />
        </button>
      </form>
    </div>
  );
}
