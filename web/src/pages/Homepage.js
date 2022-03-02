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

  loadApplets() {
    this.state.appletList = [
      {
        "uuid": "11111",
        "title": "",
        "description": "",
        "type": "DiscordMessage",
        "user_uuid": "9",
        "enabled": true,
        "family": "reaction",
        "content": {
          "channel_id": "937707430643634178"
        }
      },
      {
        "uuid": "1112",
        "type": "TwitterTweet",
        "user_uuid": "0",
        "enabled": true,
        "family": "reaction",
        "content": {}
      },
      {
        "uuid": "1113",
        "type": "GmailSendEmail",
        "user_uuid": "0",
        "enabled": true,
        "family": "reaction",
        "content": {
          "receiver": "luann.bertaud@gmail.com",
          "subject": "Area-Auto"
        }
      },
      {
        "uuid": "1203",
        "type": "GmailWebhook",
        "user_uuid": "9",
        "enabled": true,
        "family": "action",
        "children": { "uuids": [11111] },
        "content": {}
      }
    ];
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
          {this.state.appletList.map((applet, id) => <Applet key={id} />)}
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
        {this.showApp()}
        {/*{this.state.redirect !== undefined ? <Navigate to={this.state.redirectUrl} /> : this.showApp()}*/}
      </div>
    );
  }
}

export default withCookies(Homepage);