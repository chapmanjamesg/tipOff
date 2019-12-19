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
            <nav className="navbar bg-black-90 fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
                {
                    !this.props.isAuthenticated() ?
                        <>
                            <h3 className="f1 tc fl w-100 dim white">TipOff</h3>
                        </>
                        :
                        <ul className="nav nav-pills nav-fill fl">

                            <li className="f7 fw6 ttu tracked">
                                <Link className="link dim white dib mr3 fl w-20" to="/home">Home</Link>
                            </li>

                            <li className="f7 fw6 ttu tracked">
                                <Link className="link dim white dib mr3 fl w-20" to="/tips">Tips</Link>
                            </li>

                            <li className="f7 fw6 ttu tracked">
                                <Link className="link dim white dib mr3 fl w-20" to="/notes">Notes</Link>
                            </li>
                            <li className="f7 fw6 ttu tracked">
                                <Link className="link dim white dib mr3 fl w-20" to="/clients">Clients</Link>
                            </li>

                            <li className="f7 fw6 ttu tracked">
                                <Link className="link dim white dib mr3 fl w-20" to="/totals">Totals</Link>
                            </li>
                        </ul>
                }
                <span className="navbar-text fl">
                    <ul className="nav nav-pills nav-fill tc fl w-100">
                        {
                            !this.props.isAuthenticated() ?
                                <>
                                    <li className="f7 fw6 ttu tracked tc fl w-50">
                                        <Link className="link dim white dib mr3" to="/login">Login</Link>
                                    </li>

                                    <li className="f7 fw6 ttu tracked tc fl w-50">
                                        <Link className="link dim white dib mr3" to="/register">Register</Link>
                                    </li>
                                </>
                                :
                                <li className="f7 fw6 ttu tracked">
                                    <div className="link dim white dib mr3" onClick={this.handleLogout}>Logout</div>
                                </li>
                        }
                    </ul>
                </span>
            </nav>
        )
    }
}

export default withRouter(NavBar)