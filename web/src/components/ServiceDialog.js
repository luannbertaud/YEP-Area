import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';
import spotify from '../assets/spotify.png';
import discord from '../assets/discord.png';
import intra from '../assets/epi.png';
import github from '../assets/github.png';
import twitter from '../assets/twitter.png';
import google from '../assets/google.png';

import './ServiceDialog.css'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ServiceDialog(props) {
    const { onClose, open } = props;

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }} style={{ background: '#1454A4' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Service login
            </Typography>
            <Button autoFocus color="inherit" onClick={onClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button onClick={() => { alert('Logout'); }}>
          <img src={spotify} alt="" width="3%" class="logoServiceDialog"/>
            <ListItemText primary="Spotify" secondary="Login to your Spotify account" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => { alert('Logout'); }}>
          <img src={discord} alt="" width="3%" class="logoServiceDialog"/>
            <ListItemText primary="Discord" secondary="Login to your Discord account" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => { alert('Logout'); }}>
          <img src={intra} alt="" width="3%" class="logoServiceDialog"/>
            <ListItemText primary="Epitech Intranet" secondary="Login to your Epitech Intranet account" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => { alert('Logout'); }}>
          <img src={github} alt="" width="3%" class="logoServiceDialog"/>
            <ListItemText primary="Github" secondary="Login to your Github account" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => { alert('Logout'); }}>
          <img src={twitter} alt="" width="3%" class="logoServiceDialog"/>
            <ListItemText primary="Twitter" secondary="Login to your Twitter account" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => { alert('Logout'); }}>
          <img src={google} alt="" width="3%" class="logoServiceDialog"/>
            <ListItemText primary="Google" secondary="Login to your Google account" />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}

ServiceDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default ServiceDialog