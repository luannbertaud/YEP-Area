import React, {useState} from "react";
import './Homepage.css';
import background from './assets/back.png';
import off from './assets/off.png';
import app1 from './assets/applet1.png';
import app2 from './assets/applet2.png';
import {Switch} from "antd";


function Homepage()
{
  const [toggle, setToggle] = useState(false);

  const toggler = () => {
    toggle ? setToggle(false): setToggle(true);
  }

  return (
    <div style={{height:'100vh', width:'100vw', overflow:'hidden', backgroundImage:`url(${background})`, backgroundSize:'cover'}}>
      <img src={app1} alt="" className="appGithub" />
      <img src={app2} alt="" className="appTwitch" />
      <div>
        <Switch  onClick={toggler} className="Toggle1"/>
        <Switch  onClick={toggler} className="Toggle2"/>
      </div>
      <img src={off} alt="" className="OFF" />
    </div>
  );
}

export default Homepage;