import React, { useState, useRef, useEffect } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import ReplyIcon from '@mui/icons-material/Reply';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import logoLL from '../images/logoLL.png';

function renderNameAndAgeFields(name, age, email, car, setName, setAge, setEmail, setCar, isFormVisible, selectedDateTime, setSelectedDateTime) {
  if (!isFormVisible) {
    return null; // No muestra el formulario si isFormVisible es false
  }
  isFormVisible = false;
  return (
    <>
    <input
      type="text"
      value={name || ''}
      onChange={(event) => setName(event.target.value)}
      placeholder="Tu nombre"
      style={{ margin: '0.5rem', padding: '1rem', borderRadius: '0.5rem', backgroundColor: 'rgba(225, 0, 152, 0.18' }}
    />
  
    <input
      type="text"
      value={age || ''}
      onChange={(event) => setAge(event.target.value)}
      placeholder="Tu edad"
      style={{ margin: '0.5rem', padding: '1rem', borderRadius: '0.5rem', backgroundColor: 'rgba(225, 0, 152, 0.18' }}
    />
  
    <input
      type="text"
      value={email || ''}
      onChange={(event) => setEmail(event.target.value)}
      placeholder="Tu correo electrónico"
      style={{ margin: '0.5rem', padding: '1rem', borderRadius: '0.5rem', backgroundColor: 'rgba(225, 0, 152, 0.18' }}
    />
  
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Selecciona una fecha"
        value={selectedDateTime}
        onChange={(newDateTime) => setSelectedDateTime(newDateTime)}
      />
    </LocalizationProvider>
  
    <Select
      value={car}
      onChange={(event) => setCar(event.target.value)}
      style={{ margin: '0.3rem', padding: '0.3rem', borderRadius: '0.5rem', backgroundColor: 'rgba(225, 0, 152, 0.18' }}
    >
      <MenuItem value="hang-ev">Hang-EV</MenuItem>
      <MenuItem value="tang-ev">Tang-EV</MenuItem>
      <MenuItem value="yuan-plus-ev">Yuan-Plus-EV</MenuItem>
    </Select>
  </>
  
    
  );
}

export default function ChatBar() {
  const [message, setMessage] = useState('');
  const [userMessages, setUserMessages] = useState([]);
  const [livyMessages, setLivyMessages] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const messagesEndRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [car, setCar] = useState(''); // Initialize with an empty string or the default car model


  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const isImage = selectedImage !== null;
    console.log(isImage);
  
    if (isImage) {
      handleImageSubmit(event);
    } else {
      if (isFormVisible) {
        // If the form is visible, send the data to the cita API
        sendCitaData(name, age, email, selectedDateTime,car);
      } else{
        handleTextSubmit(event);
      }
    }
  };
  
  async function sendCitaData(name, age, email, selectedDateTime, car) {
    const apiUrl = 'http://10.48.206.1:8000/cita/nueva';
    const headers = { 'Content-Type': 'application/json' };
  
    try {
      const data = {
        name,
        date: selectedDateTime.format('YYYY-MM-DD') + ' 00:00:00',
        age: parseInt(age),
        car: car,
        email,
      };
      const format = JSON.stringify(data)
      console.log(format)
      const response = await axios.post(
        apiUrl,
        format,
        {
          headers,
          withCredentials: false,
        }
      );
  
      // Handle the response as needed
      console.log('Cita API response:', response.data);
      if (response.status == 200) {
        // Si la respuesta es "Cita agendada con éxito", muestra el mensaje en Livy
        setLivyMessages([...livyMessages, { text: 'Cita agendada con éxito', sentByUser: false }]);
        setIsFormVisible(false);
      }
    } catch (error) {
      console.error('Error en la solicitud a la API:', error);
    }
  }
  

  async function handleTextSubmit(event) {
    event.preventDefault();
  
    const apiUrl = 'http://10.48.206.1:8000/text';
    const headers = { 'Content-Type': 'application/json' };
  
    setUserMessages([...userMessages, { text: message, sentByUser: true }]);
    setMessage('');
  
    try {
      const response = await axios.post(
        apiUrl,
        { text: message },
        {
          headers: headers,
          withCredentials: false,
        }
      );
  
      const livyResponse = response.data.response;
  
      if (livyResponse === 'Activa') {
        setIsFormVisible(true);
      } else if (livyResponse.trim() == '') {
        setIsFormVisible(false);
        setLivyMessages([...livyMessages, { text: '¿En qué puedo ayudarte?', sentByUser: false }]);
      } else {
        setIsFormVisible(false);
        setLivyMessages([...livyMessages, { text: livyResponse, sentByUser: false }]);
      }
      
    } catch (error) {
      console.error('Error en la solicitud a la API:', error);
    }
  }
  
  async function handleImageSubmit(event) {
    event.preventDefault();
  
    const apiUrl = 'http://10.48.206.1:8000/upload';
    const headers = { 'Content-Type': 'multipart/form-data' };
  
    const formData = new FormData();
    formData.append('file', selectedImage);
  
    setUserMessages([...userMessages, { image: selectedImage, sentByUser: true }]);
    setSelectedImage(null);
  
    try {
      const response = await axios.post(
        apiUrl,
        formData,
        {
          headers: headers,
          withCredentials: false,
        }
      );
    
      if (response.status === 200) {
        const livyResponse = response.data.car_model;
        const livyResponse2 = response.data.label;
        const combinedMessage = `Modelo de auto: ${livyResponse}---\n\n\n Descripción: ${livyResponse2}`;
        setLivyMessages([...livyMessages, { text: combinedMessage, sentByUser: false }]);

      } else {
        console.error('Error en la solicitud a la API. Código de estado:', response.status);
      }
    } catch (error) {
      console.error('Error en la solicitud a la API:', error);
    }
  }
  


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

  const combinedMessages = [];
    let userIndex = 0;
    let livyIndex = 0;

    while (userIndex < userMessages.length || livyIndex < livyMessages.length) {
      if (userIndex < userMessages.length) {
        combinedMessages.push(userMessages[userIndex]);
        userIndex++;
      }

      if (livyIndex < livyMessages.length) {
        combinedMessages.push(livyMessages[livyIndex]);
        livyIndex++;
      }
    }

    return (
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', left: '2rem', width: 'calc(100% - 4rem)', height: 'calc(80vh - 4rem)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ backgroundColor: 'white', padding: '3rem', flex: 1, overflowY: 'auto', borderRadius: '1rem' }}>
          <div style={{ backgroundColor: 'white', padding: '1rem' }}>
            {combinedMessages.map((msg, index) => (
              <div key={index} style={{ marginBottom: '1rem', padding: '2rem' }}>
                <div style={msg.sentByUser ? userMessageStyle : livyMessageStyle}>
                  {msg.sentByUser && (
                    <div style={{ float: 'right', marginRight: '0.5rem' }}>
                      {!msg.isCalendarActive && msg.image && <img src={URL.createObjectURL(msg.image)} alt="User Image" style={{ maxWidth: '100%', height: 'auto' }} />}
                      {!msg.isCalendarActive && <div style={{ float: 'right', marginLeft: '0.5rem' }}>
                        <PersonIcon />
                      </div>}
                    </div>
                  )}
                  {msg.text}
                  {!msg.sentByUser && (
                    <div style={{ float: 'left', marginRight: '0.5rem' }}>
                      <div style={{ width: '30px', height: '30px', borderRadius: '50%', overflow: 'hidden' }}>
                        <img src={logoLL} alt="Livy" style={{ maxWidth: '100%', height: 'auto' }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

          
            <div ref={messagesEndRef}></div>
            
          </div>
          
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
        {renderNameAndAgeFields(name, age,email,car, setName, setAge, setEmail, setCar, isFormVisible, selectedDateTime, setSelectedDateTime)}
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
        <label htmlFor="imageInput" style={{ backgroundColor: 'rgba(225, 0, 152, 0.18)', borderRadius: '1rem', padding: '1rem', cursor: 'pointer', border: '2px solid black' }}>
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
         <img
          src={selectedImage && URL.createObjectURL(selectedImage)}
          alt="Image Preview"
          style={{ float: 'none', marginLeft: '0.5rem', maxWidth: '20%', height: '20%', display: selectedImage ? 'block' : 'none' }}
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
