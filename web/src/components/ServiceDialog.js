import React,{useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';
import axios from "axios";
import { useCookies } from 'react-cookie';
import spotify from '../assets/spotify.png';
import discord from '../assets/discord.png';
import intra from '../assets/epi.png';
import github from '../assets/github.png';
import twitter from '../assets/twitter.png';
import google from '../assets/google.png';
import './ServiceDialog.css';

const REACT_APP_SERV_URL = process.env.REACT_APP_SERV_URL

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Popup(page) {
	window.open(page,"_blank","menubar=no, status=no, scrollbars=no, menubar=no, width=700, height=500");
}

function Spotify () {
	const [state, setState] = useState(false);
	const [cookies] = useCookies(['token']);
	const urlSpotify = REACT_APP_SERV_URL + "auth/spotify/authorize"
	console.log(cookies);

    const toggle=()=>{
	if (!state) {
		axios.get(urlSpotify, {
		headers: {
		  'Authorization': cookies.token
		},
		maxRedirects: 0,
	  }).then(function(response) {
		Popup(response.data.url)
	   })
	}
	setState(!state);
    }

    return (
	<div>
	    <button onClick={toggle} className={'spotify--button ' + (state ? 'spotify--close':'')}>
		{state ? 'Spotify' :'Spotify'}
	    </button>
		<img src={spotify} alt="" className="spotify" />
	</div>
    );
}

function Discord () {
	const [state, setState] = useState(false);
	const [cookies] = useCookies(['token']);
	const urlDiscord = REACT_APP_SERV_URL + "auth/discord/authorize"
	console.log(cookies);

    const toggle=()=>{
	if (!state) {
		axios.get(urlDiscord, {
		headers: {
		  'Authorization': cookies.token
		},
		maxRedirects: 0,
	  }).then(function(response) {
		Popup(response.data.url)
	   })
	}
	setState(!state);
    }

    return (
	<div>
	    <button onClick={toggle} className={'discord--button ' + (state ? 'discord--close':'')}>
		{state ? 'Discord' :'Discord'}
	    </button>
		<img src={discord} alt="" className="discord" />
	</div>
    );
}

function Intra () {
	const [state, setState] = useState(false);
	const [cookies] = useCookies(['token']);
	const urlIntra = REACT_APP_SERV_URL + "auth/epitech/authorize"
	console.log(cookies);

    const toggle=()=>{
	if (!state) {
		axios.get(urlIntra, {
		headers: {
		  'Authorization': cookies.token
		},
		maxRedirects: 0,
	  }).then(function(response) {
		Popup(response.data.url)
	   })
	}
	setState(!state);
    }

    return (
	<div>
	    <button onClick={toggle} className={'intra--button ' + (state ? 'intra--close':'')}>
		{state ? 'Intra' :'Intra'}
	    </button>
		<img src={intra} alt="" className="intra" />
	</div>
    );
}

function Github () {
	const [state, setState] = useState(false);
	const [cookies] = useCookies(['token']);
	const urlGithub = REACT_APP_SERV_URL + "auth/github/authorize"
	console.log(cookies);

    const toggle=()=>{
	if (!state) {
		axios.get(urlGithub, {
		headers: {
		  'Authorization': cookies.token
		},
		maxRedirects: 0,
	  }).then(function(response) {
		Popup(response.data.url)
	   })
	}
	setState(!state);
    }

    return (
	<div>
	    <button onClick={toggle} className={'github--button ' + (state ? 'github--close':'')}>
		{state ? 'Github' :'Github'}
	    </button>
		<img src={github} alt="" className="github" />
	</div>
    );
}

function Twitter () {
	const [state, setState] = useState(false);
	const [cookies] = useCookies(['token']);
	const urlTwitter = REACT_APP_SERV_URL + "auth/twitter/authorize"
	console.log(cookies);

    const toggle=()=>{
	if (!state) {
		axios.get(urlTwitter, {
		headers: {
		  'Authorization': cookies.token
		},
		maxRedirects: 0,
	  }).then(function(response) {
		Popup(response.data.url)
	   })
	}
	setState(!state);
    }

    return (
	<div>
	    <button onClick={toggle} className={'twitter--button ' + (state ? 'twitter--close':'')}>
		{state ? 'Twitter' :'Twitter'}
	    </button>
		<img src={twitter} alt="" className="twitter" />
	</div>
    );
}

function Google () {
	const [state, setState] = useState(false);
	const [cookies] = useCookies(['token']);
	const urlGoogle = REACT_APP_SERV_URL + "auth/google/authorize"
	console.log(cookies);

    const toggle=()=>{
	if (!state) {
		axios.get(urlGoogle, {
		headers: {
		  'Authorization': cookies.token
		},
		maxRedirects: 0,
	  }).then(function(response) {
		Popup(response.data.url)
	   })
	}
	setState(!state);
    }

    return (
	<div>
	    <button onClick={toggle} className={'google--button ' + (state ? 'google--close':'')}>
		{state ? 'Google' :'Google'}
	    </button>
		<img src={google} alt="" className="google" />
	</div>
    );
}

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
          <ListItem>
            <Spotify />
          </ListItem>
          <ListItem>
            <Discord />
          </ListItem>
          <ListItem>
            <Intra />
          </ListItem>
          <ListItem>
            <Github />
          </ListItem>
          <ListItem>
            <Twitter />
          </ListItem>
          <ListItem>
            <Google />
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