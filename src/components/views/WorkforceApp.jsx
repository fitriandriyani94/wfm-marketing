import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import AuthenticatedRoute from '../services/AuthenticatedRoute.jsx';
import LoginComponent from '../views/LoginComponent.jsx';
import HeaderComponent from '../views/HeaderComponent.jsx';
import WelcomeComponent from '../views/WelcomeComponent.jsx';
import ErrorComponent from '../views/ErrorComponent.jsx';
import LogoutComponent from '../views/LogoutComponent.jsx';
import ListEmployeeComponent from '../views/ListEmployeeComponent.jsx';
import EmployeeComponent from '../views/EmployeeComponent.jsx';
import ListJobComponent from '../views/ListJobComponent.jsx';
import JobComponent from '../views/JobComponent.jsx';
import ListShiftComponent from '../views/ListShiftComponent.jsx';
import ShiftComponent from '../views/ShiftComponent.jsx';
import ListSkillComponent from '../views/ListSkillComponent.jsx';
import SkillComponent from '../views/SkillComponent.jsx';
import ListRoleComponent from '../views/ListRoleComponent.jsx';
import RoleComponent from '../views/RoleComponent.jsx';
import OptimizerComponent from '../views/OptimizerComponent.jsx';

class WorkforceApp extends Component {
    render() {
        return(
            <div className="TodoApp">
                <HashRouter basename="/">
                    <>
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                            <AuthenticatedRoute path="/employees" component={ListEmployeeComponent}/>
                            <AuthenticatedRoute path="/employee/:id" component={EmployeeComponent}/>
                            <AuthenticatedRoute path="/jobs" component={ListJobComponent}/>
                            <AuthenticatedRoute path="/job/:id" component={JobComponent}/>
                            <AuthenticatedRoute path="/roles" component={ListRoleComponent}/>
                            <AuthenticatedRoute path="/role/:id" component={RoleComponent}/>
                            <AuthenticatedRoute path="/shifts" component={ListShiftComponent}/>
                            <AuthenticatedRoute path="/shift/:id" component={ShiftComponent}/>
                            <AuthenticatedRoute path="/skills" component={ListSkillComponent}/>
                            <AuthenticatedRoute path="/skill/:id" component={SkillComponent}/>
                            <AuthenticatedRoute path="/optimizer" component={OptimizerComponent}/>
                            <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                            <Route path="" component={ErrorComponent}/>
                        </Switch>                        
                    </>
                </HashRouter>
            </div>
        );
    }
}

export default WorkforceApp;