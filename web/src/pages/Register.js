import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { withCookies } from 'react-cookie';

class RegisterForm extends Component {
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
            <div className="formCenter">
                <div className="formFields">
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
                        <label className="formFieldLabel" htmlFor="email">
                            E-Mail Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="formFieldInput"
                            placeholder="Enter your email"
                            name="email"
                            onChange={this.onMailChange}
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
                        <button className="formFieldButton" onClick={this.onClickRegister}>Sign Up</button>{" "}
                        <Link to="/login" className="formFieldLink">
                            I already have an account
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default withCookies(RegisterForm);
