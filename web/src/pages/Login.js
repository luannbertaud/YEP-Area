import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import { withCookies } from "react-cookie";
import { Link, Navigate } from "react-router-dom";
import { Box, Container, Grid, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Google from "../resources/google.png"
import Area from "../resources/logoArea.png"
import { GoogleLogin } from 'react-google-login';

import "./style.css"

const theme = createTheme();
const REACT_APP_GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: undefined,
            password: undefined,
            idToken: undefined,
            redirect: undefined,
            redirectUrl: undefined,
        }
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onClickLogin = this.onClickLogin.bind(this);
    }
    onUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }
    onPasswordChange(event) {
        this.setState({
            password: event.target.value
        })
    }
    onClickLogin() {
        const { cookies } = this.props;
        axios.post('https://api.yep-area.cf/auth/area/login', {
            "user_name": this.state.username,
            "user_password": this.state.password
        }).then((response) => {
            cookies.set('token', response.data.access_token, { path: '/' });
            this.setState({
                redirect: true,
                redirectUrl: "/",
            })
        }).catch((err) => {
            console.log(err);

        });

    }
    responseGoogle = (response) => {
        const { cookies } = this.props;
        axios.post('https://api.yep-area.cf/auth/area/login/google', {
            "user_name": "",
            "user_password": "",
            "idToken": response["tokenId"],
        }).then((response) => {
            cookies.set('token', response.data.access_token, { path: '/' });
            this.setState({
                redirect: true,
                redirectUrl: "/",
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            < div style={{ backgroundColor: "#249BD3", height: '100vh', overflow: 'hidden' }}>
                <ThemeProvider theme={theme} >
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className="modal-content rounded-5 shadow">
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    borderRadius: 4,
                                    padding: "50px",
                                }}>
                                <img src={Area} />
                                <Typography component="h1" variant="h5">
                                    Sign in
                                </Typography>
                                <Box component="form" noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Username"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        onChange={this.onUsernameChange}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        onChange={this.onPasswordChange}
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                    <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={this.onClickLogin}>
                                        Sign In
                                    </Button>
                                    <Grid container>
                                        <Grid item>
                                            <Link to={"/register"}>
                                                {"Don't have an account? Sign up"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                    <GoogleLogin
                                        clientId={REACT_APP_GOOGLE_CLIENT_ID}
                                        render={renderProps => (
                                            <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="loginButton googleBackground">
                                                <img src={Google} alt="" className="icon" />
                                                Login with Google
                                            </button>
                                        )}
                                        buttonText="Login"
                                        onSuccess={(res) => { this.responseGoogle(res) }}
                                        onFailure={(res) => { this.responseGoogle(res) }}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                </Box>
                            </Box>
                            {this.state.redirect !== undefined ? <Navigate to={this.state.redirectUrl} /> : null}
                        </div>
                    </Container>
                </ThemeProvider>
            </div>
        );
    }
}

export default withCookies(Login);