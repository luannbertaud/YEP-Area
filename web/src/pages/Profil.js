import React,{useState} from 'react';
import './Profil.css';
import axios from "axios";
import { useCookies } from 'react-cookie';
import background from '../assets/back.png';
import home from '../assets/return.png';
import spotify from '../assets/spotify.png';
import discord from '../assets/discord.png';
import intra from '../assets/epi.png';
import github from '../assets/github.png';
import twitter from '../assets/twitter.png';
import google from '../assets/google.png';

function Popup(page) {
	window.open(page,"_blank","menubar=no, status=no, scrollbars=no, menubar=no, width=700, height=500");
}

function Spotify () {
	const [state, setState] = useState(false);

	const [cookies, setCookie] = useCookies(['token']);
	console.log(cookies);

    const toggle=()=>{
	if (!state) {
		axios.get('https://api.yep-area.cf/auth/spotify/authorize', {
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
		{state ? 'Spotify LOGIN' :'Spotify LOGOUT'}
	    </button>
		<img src={spotify} alt="" className="spotify" />
	</div>
    );
}

function Discord () {
	const [state, setState] = useState(false);

	const [cookies, setCookie] = useCookies(['token']);
	console.log(cookies);

    const toggle=()=>{
	if (!state) {
		axios.get('https://api.yep-area.cf/auth/discord/authorize', {
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
		{state ? 'Discord LOGIN' :'Discord LOGOUT'}
	    </button>
		<img src={discord} alt="" className="discord" />
	</div>
    );
}

function Intra () {
	const [state, setState] = useState(false);

	const [cookies, setCookie] = useCookies(['token']);
	console.log(cookies);

    const toggle=()=>{
	if (!state) {
		axios.get('https://api.yep-area.cf/auth/intra/authorize', {
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
		{state ? 'Intra LOGIN' :'Intra LOGOUT'}
	    </button>
		<img src={intra} alt="" className="intra" />
	</div>
    );
}

function Github () {
	const [state, setState] = useState(false);

	const [cookies, setCookie] = useCookies(['token']);
	console.log(cookies);

    const toggle=()=>{
	if (!state) {
		axios.get('https://api.yep-area.cf/auth/github/authorize', {
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
		{state ? 'Github LOGIN' :'Github LOGOUT'}
	    </button>
		<img src={github} alt="" className="github" />
	</div>
    );
}

function Twitter () {
	const [state, setState] = useState(false);

	const [cookies, setCookie] = useCookies(['token']);
	console.log(cookies);

    const toggle=()=>{
	if (!state) {
		axios.get('https://api.yep-area.cf/auth/twitter/authorize', {
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
		{state ? 'Twitter LOGIN' :'Twitter LOGOUT'}
	    </button>
		<img src={twitter} alt="" className="twitter" />
	</div>
    );
}

function Google () {
	const [state, setState] = useState(false);

	const [cookies, setCookie] = useCookies(['token']);
	console.log(cookies);

    const toggle=()=>{
	if (!state) {
		axios.get('https://api.yep-area.cf/auth/google/authorize', {
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
		{state ? 'Google LOGIN' :'Google LOGOUT'}
	    </button>
		<img src={google} alt="" className="google" />
	</div>
    );
}

function Profil() {
    return (
	<div style={{height:'100vh', width:'100vw', overflow:'hidden', backgroundImage:`url(${background})`, backgroundSize:'cover'}}>
		<div className="Profil">
			<Spotify />
			<Discord />
			<Intra />
			<Github />
			<Twitter />
			<Google />
      		<img src={home} alt="" className="return" />
		</div>
	</div>
    );
}

export default Profil;