import React, { Component } from "react";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";

import "./App.css";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="appAside">
                        <img src={require("./resources/logoArea.png")} class="logoFormat logoCenter"/>
                    </div>
                    <div className="appForm">
                        <div className="pageSwitcher">
                            <NavLink
                                to="/signIn"
                                activeClassName="pageSwitcherItem-active"
                                className="pageSwitcherItem"
                            >
                                Sign In
                            </NavLink>
                            <NavLink
                                exact
                                to="/"
                                activeClassName="pageSwitcherItem-active"
                                className="pageSwitcherItem"
                            >
                                Sign Up
                            </NavLink>
                        </div>

                        <div className="formTitle">
                            <NavLink
                                to="/signIn"
                                activeClassName="formTitleLink-active"
                                className="formTitleLink"
                            >
                                Sign In
                            </NavLink>{" "}
                            or{" "}
                            <NavLink
                                exact
                                to="/"
                                activeClassName="formTitleLink-active"
                                className="formTitleLink"
                            >
                                Sign Up
                            </NavLink>
                        </div>

                        <Route exact path="/" component={RegisterForm} />
                        <Route path="/signIn" component={LoginForm} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
