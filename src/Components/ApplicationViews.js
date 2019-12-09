import { Route } from "react-router-dom";
import React, { Component } from "react";
import Registration from "./Auth/Registration"
import Login from "./Auth/Login";

export default class ApplicationViews extends Component {

    isAuthenticated = () => localStorage.getItem("credentials") !== null
    getUserId = () => {
        if(this.isAuthenticated()){
            return JSON.parse(localStorage.getItem("credentials")).userId
    }}

    render(){
        return (
            <>
            <Route
                exact path="/register" render={props =>
                {
                    return <Registration setUser={this.props.setUser}{...props} />
                }} />
            <Route 
                exact path="/login" render={props => {
                    return <Login setUser= {this.props.setUser} isAuthenticated= {this.isAuthenticated}{...props} />
                }} />
            </>
        )
    }
}