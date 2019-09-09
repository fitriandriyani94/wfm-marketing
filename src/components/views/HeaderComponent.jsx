import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AuthenticationService from '../services/AuthenticationService.js';

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        const getUserLoggedIn = AuthenticationService.getLoggedInUserName();

        return(
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="https://raharja.ac.id/" className="navbar-brand">Workforce Management</a></div>
                    <ul className="navbar-nav"> 
                        {isUserLoggedIn && <li><Link className="nav-link" to={"/welcome/" + getUserLoggedIn}>Home</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/employees">Employee</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/roles">Role</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/jobs">Job</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/shifts">Shift</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/skills">Skill</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/optimizer">Optimizer</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default HeaderComponent