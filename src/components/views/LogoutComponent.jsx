import React, {Component} from 'react';
import HeaderComponent from '../views/HeaderComponent.jsx';

class LogoutComponent extends Component {
    render() {
        return(
            <>
                <HeaderComponent/>
                <h1>You are logged out</h1>
                <div className="container">
                    Thank Your for Using Our Application
                </div>
            </>
        )
    }
}

export default LogoutComponent