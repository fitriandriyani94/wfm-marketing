import React, {Component} from 'react';
import moment from 'moment';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import EmployeeDataService from '../services/EmployeeDataService.js';
import FooterComponent from './FooterComponent.jsx';

class EmployeeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            employeeId: '',
            name: '',
            username: '',
            password: '',
            birthPlace: '',
            birthDate: '',
            address: '',
            gender: '',
            phoneNumber: '',
            email: '',
            joinDate: '',
            resignationDate: '',
            employeeStatus: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {

        if(this.state.id === -1) {
            return
        }

        EmployeeDataService.retrieveEmployee(this.state.id)
        .then(response => this.setState({
            employeeId:response.data.employeeId,
            name:response.data.name,
            username:response.data.username,
            password:response.data.password,
            birthPlace:response.data.birthPlace,
            birthDate:moment(response.data.birthDate).format('YYYY-MM-DD'),
            address:response.data.address,
            gender:response.data.gender,
            phoneNumber:response.data.phoneNumber,
            email:response.data.email,
            joinDate:moment(response.data.joinDate).format('YYYY-MM-DD'),
            resignationDate:moment(response.data.resignationDate).format('YYYY-MM-DD'),
            employeeStatus:response.data.employeeStatus
        }))
    }

    validate(values) {
        let errors = {}
        
        if(!values.name) {
            errors.name = 'Enter an employee name'           
        } else if(values.name.length < 4) {
            errors.name = 'Enter at least 4 characters for employee name'
        }

        if(!values.username) {
            errors.nip = 'Enter a NIP'           
        } else if(values.nip.length < 4) {
            errors.nip = 'Enter at least 4 characters for employee username'
        }

        return errors;
    }

    onSubmit(values) {

        if(this.state.id === '-1') {
            console.log("Create")
            EmployeeDataService.createEmployee({
                employeeId:values.employeeId,
                name:values.name,
                username:values.username,
                password:values.password,
                birthPlace:values.birthPlace,
                birthDate:values.birthDate,
                address:values.address,
                gender:values.gender,
                phoneNumber:values.phoneNumber,
                email:values.email,
                joinDate:values.joinDate,
                resignationDate:'',
                employeeStatus:values.employeeStatus
            }).then(() => this.props.history.push('/employees'))
        } else {
            console.log("Update")
            EmployeeDataService.updateEmployee(this.state.id, {
                employeeId:values.employeeId,
                name:values.name,
                username:values.username,
                password:values.password,
                birthPlace:values.birthPlace,
                birthDate:values.birthDate,
                address:values.address,
                gender:values.gender,
                phoneNumber:values.phoneNumber,
                email:values.email,
                joinDate:values.joinDate,
                resignationDate:'',
                employeeStatus:values.employeeStatus
            }).then(() => this.props.history.push('/employees'))
        }
    }

    render() {
        let {employeeId, name, username, password, birthPlace, birthDate, address, gender, phoneNumber, email, joinDate, resignationDate, employeeStatus} = this.state

        return (
            <div>
                <h1>Employee</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-md-1">
                        </div>
                        <div className="col-md-10">
                            <Formik 
                                initialValues={{employeeId, name, username, password, birthPlace, birthDate, address, gender, phoneNumber, email, joinDate, resignationDate, employeeStatus}}
                                onSubmit={this.onSubmit}
                                validateOnChange={false}
                                validateOnBlur={false}
                                validate={this.validate}
                                enableReinitialize={true}
                            >
                                {
                                    (props) => (
                                        <Form>
                                            <ErrorMessage name="name" component="div" className="alert alert-warning"/>                                            
                                            <ErrorMessage name="username" component="div" className="alert alert-warning"/>
                                            <fieldset className="form-group">
                                                <label>Employee ID</label>
                                                <Field className="form-control" type="text" name="employeeId"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Name</label>
                                                <Field className="form-control" type="text" name="name"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Username</label>
                                                <Field className="form-control" type="text" name="username"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Password</label>
                                                <Field className="form-control" type="password" name="password"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Birth Place</label>
                                                <Field className="form-control" type="text" name="birthPlace"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Birth Date</label>
                                                <Field className="form-control" type="date" name="birthDate"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Address</label>
                                                <Field className="form-control" type="text" name="address"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Gender</label>
                                                <Field className="form-control" type="text" name="gender"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Phone Number</label>
                                                <Field className="form-control" type="text" name="phoneNumber"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Email</label>
                                                <Field className="form-control" type="text" name="email"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Join Date</label>
                                                <Field className="form-control" type="date" name="joinDate"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Resignation Date</label>
                                                <Field className="form-control" type="date" name="resignationDate"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Employee Status</label>
                                                <Field className="form-control" type="text" name="employeeStatus"/>
                                            </fieldset>
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
                <FooterComponent/>
            </div>            
        )
    }
}

export default EmployeeComponent