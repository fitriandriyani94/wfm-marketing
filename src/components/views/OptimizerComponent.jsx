import React, { Component } from "react";
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment'
import FooterComponentList from './FooterComponentList.jsx';
import HeaderComponent from '../views/HeaderComponent.jsx';
import AuthenticationService from '../services/AuthenticationService.js';
import EmployeeDataService from '../services/EmployeeDataService.js';
import OptimizerService from '../services/OptimizerService.js';

class OptimizerComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            apigroup: [],
            apijob: [],
            jobs:[]
        }
        this.optimizerClicked = this.optimizerClicked.bind(this);
        this.refreshActiveEmployees = this.refreshActiveEmployees.bind(this);
        this.refreshActiveJobs = this.refreshActiveJobs.bind(this);
    }

    componentDidMount() {
        this.refreshActiveEmployees();
        this.refreshActiveJobs();        
    }

    refreshActiveEmployees() {
        EmployeeDataService.retrieveAllActiveEmployees()
        .then(
            response => {
                this.setState({apigroup: response.data})
            }
        )
    }

    refreshActiveJobs() {
        OptimizerService.getOptimizer()
        .then(
            response => {
                this.setState({jobs:response.data})
            }
        )
    }

    optimizerClicked() {
        this.state.jobs.map (
            job => {
                const item = {
                    id: job.id,
                    group: job.group,
                    title: job.title,
                    start_time: moment(job.startTime, "YYYY-MM-DD HH:mm"),
                    end_time: moment(job.endTime, "YYYY-MM-DD HH:mm")
                }
                this.setState(previousState => ({
                    apijob: [...previousState.apijob, item]
                }))
            }
        )
        console.log("Finish!");
    }

    render() {
        const isAdminLoggedIn = AuthenticationService.isAdminLoggedIn();

        return (
            <div>
                <HeaderComponent/>
                <div className="container">
                    <h3>Employee Scheduling</h3>
                    <Timeline
                        groups={this.state.apigroup}
                        items={this.state.apijob}
                        defaultTimeStart={moment().add(-12, 'hour')}
                        defaultTimeEnd={moment().add(12, 'hour')}
                    />
                    <br/>
                    {isAdminLoggedIn && <button className="btn btn-md btn-success" onClick={this.optimizerClicked}>
                        Optimize
                    </button>}                      
                </div>
                <FooterComponentList/>
            </div>
        )
    }
}

export default OptimizerComponent