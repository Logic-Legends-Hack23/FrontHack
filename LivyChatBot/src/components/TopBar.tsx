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
import { Button, Popover } from '@mui/material';

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

export default function TopBar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
          <div
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <IconButton
              size="large"
              aria-label="display more actions"
              edge="end"
              color="inherit"
              aria-owns={open ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
            >
              <MoreIcon />
            </IconButton>
          </div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <div>¡Hola! Soy un popover de ejemplo.</div>
          </Popover>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}
