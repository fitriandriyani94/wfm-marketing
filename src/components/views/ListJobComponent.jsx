import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import JobDataService from '../services/JobDataService.js';
import FooterComponentList from './FooterComponentList.jsx';
import HeaderComponent from '../views/HeaderComponent.jsx';

class ListJobComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jobs: [],
            message:""
        }
        this.refreshJobs = this.refreshJobs.bind(this);
        this.deleteJobClicked = this.deleteJobClicked.bind(this);
        this.updateJobClicked = this.updateJobClicked.bind(this);
        this.addJobClicked = this.addJobClicked.bind(this);
    }

    componentDidMount() {
        this.refreshJobs();
    }

    refreshJobs() {
        JobDataService.retrieveAllJobs("name")
            .then(
                response => {
                    this.setState({jobs: response.data})
                }
            )
    }

    deleteJobClicked(id, name) {
        JobDataService.deleteJob(id)
            .then(
                response => {
                    this.setState({message: `Delete of job ${name} Successful`})
                    this.refreshJobs()
                }
            )
    }

    updateJobClicked(id) {
        console.log("Update: " + id)
        this.props.history.push(`/job/${id}`)
    }

    addJobClicked() {
        this.props.history.push('/job/-1')
    }

    render() {
        return(
            <div>
                <HeaderComponent/>
                <h3>List Job</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <Table bordered striped hover size="sm">
                        <thead>
                            <tr>
                                <th>Job Code</th>
                                <th>Job Description</th>
                                <th>Shift</th>
                                <th>Activity Date</th>
                                <th>Start</th>
                                <th>End</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.jobs.map (
                                    job => 
                                    <tr key={job.jobCode}>
                                        <td>{job.jobCode}</td>
                                        <td>{job.jobDescription}</td>
                                        <td>{job.shiftCode}</td>
                                        <td>{job.activityDate}</td>
                                        <td>{job.startTime}</td>
                                        <td>{job.endTime}</td>
                                        <td><button className="btn btn-sm btn-info" onClick={() => this.updateJobClicked(job.jobCode)}>Update</button></td>
                                        <td><button className="btn btn-sm btn-danger" onClick={() => this.deleteJobClicked(job.jobCode, job.jobCode)}>Delete</button></td>
                                    </tr>
                                )
                            }                        
                        </tbody>
                    </Table>
                    <div className="row">
                        <button className="btn btn-info" onClick={() => this.addJobClicked()}>Add</button>
                    </div>
                </div>
                <FooterComponentList/>
            </div>
        )
    }
}

export default ListJobComponent