import React, {Component} from 'react';
import moment from 'moment';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import JobDataService from '../services/JobDataService.js';
import FooterComponent from './FooterComponent.jsx';
import HeaderComponent from '../views/HeaderComponent.jsx';

class JobComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            jobCode: '',
            jobName: '',
            shiftCode: '',
            activityDate: '',
            activityName: '',
            instance: '',
            classCount: '',
            startTime: '',
            endTime: '',
            employeeId: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {

        if(this.state.id === -1) {
            return
        }

        JobDataService.retrieveJob(this.state.id)
        .then(response => this.setState({
            jobCode:response.data.jobCode,
            jobName:response.data.jobName,
            shiftCode:response.data.shiftCode,
            activityDate:moment(response.data.activityDate).format('YYYY-MM-DD'),
            activityName:response.data.activityName,
            instance:response.data.instance,
            classCount:response.data.classCount,
            startTime:response.data.startTime,
            endTime:response.data.endTime,
            employeeId:response.data.employeeId
        }))
    }

    validate(values) {
        let errors = {}
        
        if(!values.jobName) {
            errors.jobName = 'Enter a job name'           
        } else if(values.jobName.length < 4) {
            errors.jobName = 'Enter at least 4 characters for job name'
        }

        if(!values.jobCode) {
            errors.jobCode = 'Enter a job code'           
        } else if(values.jobCode.length < 1) {
            errors.jobCode = 'Enter at least 1 characters for job code'
        }

        return errors;
    }

    onSubmit(values) {
        console.log("Here")
        if(this.state.id === '-1') {
            console.log("Create")
            JobDataService.createJob({
                jobCode:values.jobCode,
                jobName:values.jobName,
                shiftCode:values.shiftCode,
                activityDate:values.activityDate,
                activityName:values.activityName,
                instance:values.instance,
                classCount:values.classCount,
                startTime:values.startTime,
                endTime:values.endTime,
                employeeId:values.employeeId
            }).then(() => this.props.history.push('/jobs'))
        } else {
            console.log("Update")
            JobDataService.updateJob(this.state.id, {
                jobCode:values.jobCode,
                jobName:values.jobName,
                shiftCode:values.shiftCode,
                activityDate:values.activityDate,
                activityName:values.activityName,
                instance:values.instance,
                classCount:values.classCount,
                startTime:values.startTime,
                endTime:values.endTime,
                employeeId:values.employeeId
            }).then(() => this.props.history.push('/jobs'))
        }
    }

    render() {
        let {jobCode, jobName, shiftCode, activityDate, activityName, instance, classCount, startTime, endTime, employeeId} = this.state

        return (
            <div>
                <HeaderComponent/>
                <h4>New Job Form</h4>
                <div className="container">
                    <div className="row">
                        <div className="col-md-1">
                        </div>
                        <div className="col-md-10">
                            <Formik 
                                initialValues={{jobCode, jobName, shiftCode, activityDate, activityName, instance, classCount, startTime, endTime, employeeId}}
                                onSubmit={this.onSubmit}
                                validateOnChange={false}
                                validateOnBlur={false}
                                validate={this.validate}
                                enableReinitialize={true}
                            >
                                {
                                    (props) => (
                                        <Form>
                                            <ErrorMessage name="jobName" component="div" className="alert alert-warning"/>                                            
                                            <ErrorMessage name="jobCode" component="div" className="alert alert-warning"/>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <fieldset className="form-group">
                                                        <label>Job Code</label>
                                                        <Field className="form-control" type="text" name="jobCode"/>
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <label>Job Name</label>
                                                        <Field className="form-control" type="text" name="jobName"/>
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <label>Shift Code</label>
                                                        <Field className="form-control" type="text" name="shiftCode"/>
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <label>Activity Date</label>
                                                        <Field className="form-control" type="date" name="activityDate"/>
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <label>Activity Name</label>
                                                        <Field className="form-control" type="text" name="activityName"/>
                                                    </fieldset>
                                                </div>
                                                <div className="col-md-6">
                                                    <fieldset className="form-group">
                                                        <label>Instance</label>
                                                        <Field className="form-control" type="text" name="instance"/>
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <label>Class Count</label>
                                                        <Field className="form-control" type="text" name="classCount"/>
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <label>Start Time</label>
                                                        <Field className="form-control" type="time" name="startTime"/>
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <label>End Time</label>
                                                        <Field className="form-control" type="time" name="endTime"/>
                                                    </fieldset>
                                                </div>
                                            </div>                                                                              
                                            <button className="btn btn-success" type="submit">Save</button>
                                        </Form>
                                    )                        
                                }
                            </Formik>
                        </div>
                        <div className="col-md-1">
                        </div>
                    </div>                    
                </div>
                <br/>
                <FooterComponent/>
            </div>
        )
    }
}

export default JobComponent