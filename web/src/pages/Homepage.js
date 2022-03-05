import React from 'react';
import { withCookies } from "react-cookie";
import NavBar from "../components/Navbar"
import Applet from "../components/Applet"
import { Box, Grid } from "@mui/material";
import axios from "axios";
import { Navigate } from "react-router-dom";

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

  logout() {
    this.cookies.set('token', null, { path: '/' });
    this.setState({
      redirect: true,
      redirectUrl: "/login"
    })
  }

  showApp() {
    const { cookies } = this.props;

    return (
      <div>
        <Box>
          <NavBar cookies={cookies} onUserLogout={() => { this.logout() }} onCreateApplet={(applet) => { this.loadApplets(); }} />
        </Box>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }} style={{ gap: "16px", padding: "25px" }}>
          {
            this.state.appletList.map((applet, id) => {
              if (applet.family === 'action') {
                return (<Applet applet={applet} cookies={cookies} onUpdateApplet={() => { this.loadApplets(); }} key={id} />);
              }

            }
            )
          }
        </Grid>
      </div>)
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