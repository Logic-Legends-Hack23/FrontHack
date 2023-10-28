import React, { useState } from 'react';
import '../styles/mainStyles.css';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreIcon from '@mui/icons-material/MoreVert';
import logoImage from '../images/livwhite.png';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(1),
  '@media all': {
    minHeight: 100,
  },
}));

const appBarStyles = {
  backgroundColor: "#E10098",
};

const infoTextStyle = {
  padding: '1rem 2rem', // Padding en los lados
  backgroundColor: 'rgba(225, 0, 152, 0.18)', // Fondo rosado
  borderRadius: '0.5rem',
  boxShadow: '0 2px 4px rgba(225, 0, 152, 0.3)', // Sombra
  fontSize: '2rem', // Tamaño de fuente más grande
  textAlign: 'center', // Texto centrado
  margin: '0 auto', // Centrar horizontalmente
  width: '50%', // Ancho del contenedor
  height: 'auto', // Altura ajustable
};

export default function TopBar() {
  const [showInfoText, setShowInfoText] = useState(false);

  const toggleInfoText = () => {
    setShowInfoText(!showInfoText);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={appBarStyles}>
        <StyledToolbar>
          <img src={logoImage} alt="falta" height="40" />
          <div id="BDY-text">BYD</div>
          <div id="chatlivy">
            <div id="livy-text">Livy</div>
            <div id="chatbot-text">ChatBot</div>
          </div>
          <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1, alignSelf: 'flex-end' }} />
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}
