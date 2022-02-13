import React, { Component } from "react";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";
import Homepage from "./pages/Homepage"

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
                                to="/login"
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
                                to="/login"
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
                        <Route path="/login" component={LoginForm} />
                    </div>
                </div>
                <Route path="/home" element={<Homepage/>} />
            </Router>
        );
    }
}

export default App;
