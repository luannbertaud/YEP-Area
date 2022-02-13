import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class RegisterForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: undefined,
            mail: undefined,
            password: undefined,
            redirectLogin: undefined,
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
        axios.post('http://localhost:8080/auth/register', {
            username: this.state.username,
            mail: this.state.mail,
            password: this.state.password
        }).then((response) => {
            if (response.status === 200)
                this.setState({ redirectLogin: true });
        }).catch((err) => {
            console.log(err.response);
        });
    }

    render() {
        return (
            <div className="formCenter">
                <form onSubmit={this.handleSubmit} className="formFields">
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
                </form>
            </div>
        );
    }
}
export default RegisterForm;
