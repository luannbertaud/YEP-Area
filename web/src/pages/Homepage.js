import React from 'react';
import { withCookies } from "react-cookie";
import NavBar from "../components/Navbar"
import Applet from "../components/Applet"
import { Box, Grid } from "@mui/material";
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
  }
  componentDidMount() {
    let auth = this.cookies.get('auth');
    if (auth === undefined || auth === null || auth === 'null' || auth.length === 0)
      this.setState({
        redirect: true,
        redirectUrl: "/login"
      });
    this.auth = auth;
  }
  showApp() {
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
          {this.state.appletList.map((applet) => <Applet />)}
        </Grid>
      </div>)
  }
  logout() {
    this.cookies.set('auth', null, { path: '/' });
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