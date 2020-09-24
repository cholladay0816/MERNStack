import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">MERNStack</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/user/login" className="nav-link">Login</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user/register" className="nav-link">Register</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link">Profile</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/worklog/add" className="nav-link">Create WorkLog</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/worklog/" className="nav-link">My WorkLogs</Link>
                        </li>
                        
                    </ul>
                </div>
            </nav>
        );

    }

}