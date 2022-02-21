import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Box, Container, Grid, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

export default class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: undefined,
            mail: undefined,
            password: undefined,
            redirectLogin: undefined,
            token: undefined,
        }
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onMailChange = this.onMailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onClickRegister = this.onClickRegister.bind(this);
    }
    onUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }
    onMailChange(event) {
        this.setState({
            mail: event.target.value
        })
    }
    onPasswordChange(event) {
        this.setState({
            password: event.target.value
        })
    }
    onClickRegister() {
        axios.post('http://localhost:8080/auth/area/register', {
            "user_name": this.state.username,
            "user_email": this.state.mail,
            "user_password": this.state.password
        }).then((response) => {
            console.log(response.data)
            this.state.token = response.data.access_token;
            if (response.status === 200)
                this.setState({ redirectLogin: true });
        }).catch((err) => {
            console.log(err.response);
        });
    }

    verifyToken() {
        axios.get('http://localhost:8080/auth/area/verify', {
            headers: { Authorization: this.state.token }
        }).then((response) => {
            console.log(response.data)
        }).catch((err) => {
            console.log(err.response);
        });
    }
    
    render() {
        if (this.state.redirectLogin)
            this.verifyToken();
        return (
            <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Username"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            onChange={this.onUsernameChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email adress"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={this.onMailChange}
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
                        <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={this.onClickRegister}>
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to={"/login"}>
                                    {"You already have a account ? Sign in"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {this.state.redirectLogin !== undefined ? <Navigate to="/login" /> : null}
            </Container>
            </ThemeProvider>
        );
    }
}
