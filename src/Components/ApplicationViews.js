import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Registration from "./Auth/Registration";
import Login from "./Auth/Login";
import TipList from "./Tips/TipList";
import TipForm from "./Tips/TipForm";

export default class ApplicationViews extends Component {

    isAuthenticated = () => localStorage.getItem("credentials") !== null
    getUserId = () => {
        if (this.isAuthenticated()) {
            return JSON.parse(localStorage.getItem("credentials")).userId
        }
    }

    render() {
        return (
            <>
                <Route
                    exact path="/register" render={props => {
                        return <Registration setUser={this.props.setUser}{...props} />
                    }} />
                <Route
                    exact path="/login" render={props => {
                        return <Login setUser={this.props.setUser} isAuthenticated={this.isAuthenticated}{...props} />
                    }} />
                <Route
                    exact path="/tips" render={props => {
                        if (this.props.user) {
                            return <TipList {...props} />
                        } else { return <Redirect to="/login" /> }
                    }} />
                <Route 
                    exact path="/tips/new" render= {props => {
                        return <TipForm {...props} isNew= {true} />
                    }}
                />
                <Route 
                    exact path="/tips/:tipId(\d+)/edit" render={props => {
                        return <TipForm {...props} isNew= {false} />
                    }}
                />
            </>
        )
    }
}