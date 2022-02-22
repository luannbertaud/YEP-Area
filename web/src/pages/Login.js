import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import {withCookies} from "react-cookie";
import {Link, Navigate} from "react-router-dom";
import {Box, Container, Grid, Typography} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Google from "../resources/google.png"
import Area from "../resources/logoArea.png"
import {GoogleLogin} from 'react-google-login';

import "./style.css"

const theme = createTheme();
const GOOGLE_CLIENT_ID = "32273301299-mu3b4fgikth03ooaj9nfuj55r71e8pdu.apps.googleusercontent.com";

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: undefined,
            password: undefined,
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
        axios.post('http://localhost:8080/auth/area/login', {
            "user_name": this.state.username,
            "user_password": this.state.password
        }).then((response) => {
            cookies.set('auth', response.data.auth, { path: '/' });
            this.setState({
                redirect: true,
                redirectUrl: "/",
            })
        }).catch((err) => {
            console.log(err);
            cookies.set('token', { path: '/' });
            this.setState({
                redirect: true,
                redirectUrl: '/',
            })
        });

    }
    responseGoogle = (response) => {
        console.log(response);
      }

    render() {
        return (
            <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div class="modal-content rounded-5 shadow">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <img src={Area}/>
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
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <GoogleLogin
                            clientId={GOOGLE_CLIENT_ID}
                            render={renderProps => (
                                <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                    <div className="loginButton google">
                                        <img src={Google} alt="" className="icon"/>
                                            Login with Google
                                    </div>
                                </button>
                              )}
                            buttonText="Login"
                            onSuccess={(res) => {console.log(res)}}
                            onFailure={(res) => {console.log(res)}}
                            cookiePolicy={'single_host_origin'}
                            // prompt='consent'
                            // responseType='token'
                        />
                    </Box>
                </Box>
                {this.state.redirect !== undefined ? <Navigate to={this.state.redirectUrl}/> : null}
                </div>
            </Container>
            </ThemeProvider>
        );
    }
}

export default withCookies(Login);