import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import {withCookies} from 'react-cookie';

class LoginForm extends Component {
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
            username: this.state.username,
            password: this.state.password
        }).then((response) => {
            cookies.set('auth', response.data.auth, {path: '/'});
            this.setState({
                redirect: true,
                redirectUrl: "/register",
            })
        }).catch((err) => {
            console.log(err);
            cookies.set('token', {path: '/'});
            this.setState({
                redirect: true,
                redirectUrl: '/',
            })
        });

    }

    render() {
        return (
            <div className="formCenter">
                    <div className="formField">
                        <label className="formFieldLabel" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="formFieldInput"
                            placeholder="Enter your name"
                            name="name"
                            onChange={this.onUsernameChange}
                        />
                    </div>

                    <div className="formField">
                        <label className="formFieldLabel" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="formFieldInput"
                            placeholder="Enter your password"
                            name="password"
                            onChange={this.onPasswordChange}
                        />
                    </div>

                    <div className="formField">
                        <button className="formFieldButton" onClick={this.onClickLogin}>Sign In</button>{" "}
                        <Link to="/register" className="formFieldLink">
                            I don't have an account
                        </Link>
                    </div>

                    <div>
                        <GoogleLogin
                            buttonText="Login with Google"
                            style={{ marginTop: '100px', color: "white" }}
                            onClick={() => alert("LoginButton")}
                        />
                    </div>
            </div>
        );
    }
}

export default withCookies(LoginForm);
