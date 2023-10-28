import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SendIcon from '@mui/icons-material/Send';

export default function ChatBar() {
  return (
    <Paper
      component="form"
      sx={{
        p: '1rem', // Espacio en todas las direcciones
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', // Centra horizontalmente
        width: '90%', // Ocupa el 90% del ancho
        position: 'fixed', // Fija la posición
        bottom: '2rem', // Espacio desde la parte inferior
        left: '5%', // Centra horizontalmente
        backgroundColor: 'rgba(225, 0, 152, 0.18)', // Cambia el color de fondo a E10098
      }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="camera"> 
        <CameraAltIcon /> 
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Habla con Livy"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton sx={{ p: '10px' }} aria-label="send"> 
        <SendIcon /> 
      </IconButton>
      
    </Paper>
  );
}
