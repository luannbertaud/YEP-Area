import React from 'react';
import { withCookies } from "react-cookie";
import NavBar from "../components/Navbar"
import Applet from "../components/Applet"
import { Box, Grid } from "@mui/material";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

class Homepage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      appletList: [],
      redirect: undefined,
      redirectUrl: undefined,
    }
    const { cookies } = this.props;
    this.cookies = cookies;
    this.logout = this.logout.bind(this);
    this.loadApplets = this.loadApplets.bind(this);
  }

  loadApplets() {
    const { cookies } = this.props;
    
    axios.get('https://api.yep-area.cf/widgets/get', {
      headers: {
        'Authorization': cookies.get('token')
      }
    }).then((response) => {
          console.log(response.data.widgets);
          this.setState({
            ...this.state,
            appletList: response.data.widgets,
          })
      })
  }

  componentDidMount() {
    let auth = this.cookies.get('token');
    if (auth === undefined || auth === null || auth === 'null' || auth.length === 0)
      this.setState({
        redirect: true,
        redirectUrl: "/login"
      });
    this.auth = auth;
    this.loadApplets();
  }

  showApp() {
    const { cookies } = this.props;

    return (
      <div>
        <Box>
          <NavBar onCreateApplet={(applet) => {
            this.setState({
              ...this.state,
              appletList: [...this.state.appletList, applet],
            })
          }} />
        </Box>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }} style={{ gap: "16px", padding: "25px" }}>
          {this.state.appletList.map((applet, id) => <Applet applet={applet} cookies={cookies} key={id}/>)}
        </Grid>
      </div>)
  }
  
  logout() {
    this.cookies.set('token', null, { path: '/' });
    this.setState({
      redirect: true,
      redirectUrl: "/login"
    })
  }

  render() {
    return (
      <div>
        {this.state.redirect !== undefined ? <Navigate to={this.state.redirectUrl} /> : this.showApp()}
      </div>
    );
  }
}

export default withCookies(Homepage);