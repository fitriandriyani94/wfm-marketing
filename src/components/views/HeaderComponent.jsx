import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AuthenticationService from '../services/AuthenticationService.js';

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        const isAdminLoggedIn = AuthenticationService.isAdminLoggedIn();
        const getUserLoggedIn = AuthenticationService.getLoggedInUserName();

        return(
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="https://raharja.ac.id/" className="navbar-brand">Workforce Management</a></div>
                    <ul className="navbar-nav"> 
                        {isUserLoggedIn && <li><Link className="nav-link" to={"/welcome/" + getUserLoggedIn}>Halaman Utama</Link></li>}
                        {isAdminLoggedIn && <li><Link className="nav-link" to="/employees">Karyawan</Link></li>}
                        {isAdminLoggedIn && <li><Link className="nav-link" to="/employeeSkills">Keahlian Karyawan</Link></li>}
                        {isAdminLoggedIn && <li><Link className="nav-link" to="/roles">Jabatan</Link></li>}
                        {isAdminLoggedIn && <li><Link className="nav-link" to="/jobs">Pekerjaan</Link></li>}
                        {isAdminLoggedIn && <li><Link className="nav-link" to="/shifts">Shift</Link></li>}
                        {isAdminLoggedIn && <li><Link className="nav-link" to="/skills">Keahlian</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/optimizer">Optimisasi</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Masuk</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Keluar</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default HeaderComponent