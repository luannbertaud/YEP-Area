import React, { Component } from "react";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";
import {withCookies} from 'react-cookie';
import Homepage from "./pages/Homepage"

import "./App.css";

class App extends Component 
{
    constructor(props) {
        super(props)
        this.state = {
            logged: false,
        }
    }

    componentDidMount() {
        const { cookies } = this.props;
        const token = cookies.get('token');
        if (token === undefined) {
            //NOT LOGGED !
        } else {
            //CHECK THE TOKEN ...
            this.setState({
                logged: true
            })
        }
    }

    render() {
        return (
            <>
                {this.state.logged === true ? <h1>Hello</h1> : <Router>
                    <div className="App">
                        <div className="appAside">
                            <img src={require("./resources/logoArea.png")} class="logoFormat logoCenter"/>
                        </div>
                        <div className="appForm">
                            <div className="pageSwitcher">
                                <NavLink
                                    to="/login"
                                    activeClassName="pageSwitcherItem-active"
                                    className="pageSwitcherItem"
                                >
                                    Sign In
                                </NavLink>
                                <NavLink
                                    exact
                                    to="/register"
                                    activeClassName="pageSwitcherItem-active"
                                    className="pageSwitcherItem"
                                >
                                    Sign Up
                                </NavLink>
                            </div>

                            <div className="formTitle">
                                <NavLink
                                    to="/login"
                                    activeClassName="formTitleLink-active"
                                    className="formTitleLink"
                                >
                                    Sign In
                                </NavLink>
                                <NavLink
                                    exact
                                    to="/register"
                                    activeClassName="formTitleLink-active"
                                    className="formTitleLink"
                                >
                                    Sign Up
                                </NavLink>
                            </div>
                            <Route path="/register" component={RegisterForm}/>
                            <Route path="/login" component={LoginForm}/>
                        </div>
                    </div>
                </Router>}
            </>
        );
    }
}

export default withCookies(App);