import React, { Component } from 'react';
import APIManager from '../Module/APIManager'

class Registration extends Component {

    state = {
        username: "",
        email: "",
        password: "",
        loadingStatus: false,
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] =
        evt.target.value
        this.setState(stateToChange)
    }

    handleRegistration = (entry) => {
        entry.preventDefault()
        if(this.state.username ==="" ||
         this.state.email === "" ||
         this.state.password === "") {
             window.alert("You really must fill out the forms please.")
         }else {
             this.setState({ loadingStatus: true })
             const registration = {
                 username: this.state.username,
                 email: this.state.email,
                 password: this.state.password,
             }
             APIManager.post("users", registration)
                .then(() =>
                APIManager.getAll(`users?email=${this.state.email}`)
                    .then((newUser) => {
                        this.props.setUser({
                            userId: newUser[0].id,
                            name: newUser[0].username,
                            email: this.state.email,
                            password: this.state.password,
                        })
                        this.props.history.push("/home")
                    })
                )
         }
    }

    render() {
        return (
            <form onSubmit={this.handleRegistration}>
                <h3>Register an Account</h3>
                <fieldset>
                    <label htmlFor="inputUsername">
                        Username:  </label>
                        <input 
                            onChange={this.handleFieldChange}
                            type="username"
                            id="username"
                            placeholder="Full Name"
                            required=""
                            autoFocus="" />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail">
                        Email Address:  </label>
                        <input
                            onChange={this.handleFieldChange}
                            type="email"
                            id="email"
                            placeholder="Email Address"
                            required=""
                            autoFocus="" />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword">
                        Password:  </label>    
                        <input
                            onChange={this.handleFieldChange}
                            type="password"
                            id="password"
                            placeholder="Password"
                            required=""
                            autoFocus="" />                
                </fieldset>
                <button
                type="submit">
                    Register</button>
            </form> 
        )
    }
}

export default Registration