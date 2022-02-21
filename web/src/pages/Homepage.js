import React from 'react';
import {withCookies} from "react-cookie";
import {Navigate} from "react-router-dom";
import {Box, Typography} from "@mui/material";

class Homepage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: undefined,
      redirectUrl: undefined,
    }
    const { cookies } = this.props;
    this.cookies = cookies;
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
    <div>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography variant={"h2"}>
            Home
        </Typography>
      </Box>
    </div>
  }

  render() {
    return (
        <div>
            {this.state.redirect !== undefined ? <Navigate to={this.state.redirectUrl}/> : this.showApp()}
        </div>
    );
  }
}

export default withCookies(Homepage);