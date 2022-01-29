import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    GoogleLoginButton
} from "react-social-login-buttons";

class LoginForm extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let target = event.target;
        let value = target.type === "checkbox" ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        console.log("The form was submitted with the following data:");
        console.log(this.state);
    }

    render() {
        return (
            <div className="formCenter">
                <form className="formFields" onSubmit={this.handleSubmit}>
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
                            value={this.state.email}
                            onChange={this.handleChange}
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
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="formField">
                        <button className="formFieldButton" onClick={() => alert("LoginButton")}>Sign In</button>{" "}
                        <Link to="/" className="formFieldLink">
                            I don't have an account
                        </Link>
                    </div>

                    <div className="socialMediaButtons">
                        <div className="googleButton">
                            <GoogleLoginButton onClick={() => alert("GoogleButton")} />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginForm;
