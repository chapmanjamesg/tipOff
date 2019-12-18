import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

class NavBar extends Component {

    handleLogout = () => {
        this.props.history.push('/login')
        this.props.clearUser()
        
    }

    getUsersName = () => JSON.parse(localStorage.getItem("credentials")).name
    render() {
        return (
            <nav className="navbar bg-dark text-white flex-md-nowrap p-0 shadow">
                {this.props.isAuthenticated()? 
                <div className="pl4">Hi {this.getUsersName()}!</div> : null
            }
                
                <ul className="nav nav-pills nav-fill">

                    <li className="nav-item">
                        <Link className="nav-link" to="/home">Home</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/tips">Tips</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/notes">Notes</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/clients">Clients</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/totals">Totals</Link>
                    </li>
                </ul>
                <span className="navbar-text">
                    <ul className="nav nav-pills nav-fill">
                        {
                        !this.props.isAuthenticated() ?
                        <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                        </>
                        : 
                        <li className="nav-item">
                            <button className="nav btn" onClick={this.handleLogout}>Logout</button>
                        </li>
                        }
                    </ul>
                </span>
            </nav>
        )
    }
}

export default withRouter(NavBar)