import * as React from 'react';
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
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 100,
  },
}));

const appBarStyles = {
  backgroundColor: "#E10098", // Establece el color de fondo de la barra aquí
};



export default function TopBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={appBarStyles}>
        <StyledToolbar>
          <img src={logoImage} alt="falta" height="40" />
          <div id="BDY-text">BYD</div>
          <div id= "chatlivy">
            <div id="livy-text" >Livy</div>
            <div id="chatbot-text" >ChatBot</div>
          </div>
          <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1, alignSelf: 'flex-end' }} />
          <IconButton size="large" aria-label="display more actions" edge="end" color="inherit">
            <MoreIcon />
          </IconButton>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}