import React, {Component} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import EmployeeSkillService from '../services/EmployeeSkillService.js';
import FooterComponentList from './FooterComponentList.jsx';
import HeaderComponent from '../views/HeaderComponent.jsx';

class EmployeeSkillComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            employeeId: '',
            skillCode: ''        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {

        if(this.state.id === -1) {
            return
        }

        EmployeeSkillService.retrieveEmployeeSkill(this.state.id)
        .then(response => this.setState({
            employeeId:response.data.employeeId,
            skillCode:response.data.skillCode
        }))
    }

    validate(values) {
        let errors = {}
        
        if(!values.employeeId) {
            errors.employeeId = 'Enter an employee ID'           
        } else if(values.employeeId.length < 1) {
            errors.employeeId = 'Enter at least 1 characters for employee ID'
        }

        if(!values.skillCode) {
            errors.skiilCode = 'Enter a skill code'           
        } else if(values.skillCode.length < 1) {
            errors.skillCode = 'Enter at least 1 characters for skill code'
        }

        return errors;
    }

    onSubmit(values) {
        console.log("Here")
        if(this.state.id === '-1') {
            console.log("Create")
            EmployeeSkillService.createEmployeeSkill({
                employeeId:values.employeeId,
                skillCode:values.skillCode
            }).then(() => this.props.history.push('/employeeSkills'))
        } else {
            console.log("Update")
            EmployeeSkillService.updateEmployeeSkill(this.state.id, {
                employeeId:values.employeeId,
                skillCode:values.skillCode
            }).then(() => this.props.history.push('/employeeSkills'))
        }
    }

    render() {
        let {employeeId, skillCode} = this.state

        return (
            <div>
                <HeaderComponent/>
                <h4>New Employee Skill Form</h4>
                <hr/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        </div>
                        <div className="col-md-6">
                            <Formik 
                                initialValues={{employeeId, skillCode}}
                                onSubmit={this.onSubmit}
                                validateOnChange={false}
                                validateOnBlur={false}
                                validate={this.validate}
                                enableReinitialize={true}
                            >
                                {
                                    (props) => (
                                        <Form>
                                            <ErrorMessage name="employeeId" component="div" className="alert alert-warning"/>                                            
                                            <ErrorMessage name="skillCode" component="div" className="alert alert-warning"/>
                                            <fieldset className="form-group">
                                                <label>Employee ID</label>
                                                <Field className="form-control" type="text" name="employeeId"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Skill Code</label>
                                                <Field className="form-control" type="text" name="skillCode"/>
                                            </fieldset>
                                            <button className="btn btn-success" type="submit">Save</button>
                                        </Form>
                                    )                        
                                }
                            </Formik>
                        </div>
                        <div className="col-md-3">
                        </div>
                    </div>                    
                </div>
                <FooterComponentList/>
            </div>
        )
    }
}

export default EmployeeSkillComponent