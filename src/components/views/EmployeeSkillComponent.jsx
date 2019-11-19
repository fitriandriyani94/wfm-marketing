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
            errors.employeeId = 'ID Karyawan tidak boleh kosong'           
        } else if(values.employeeId.length < 1) {
            errors.employeeId = 'Panjang ID karyawan tidak boleh kurang dari satu huruf'
        }

        if(!values.skillCode) {
            errors.skillCode = 'Kode keahlian tidak boleh kosong'           
        } else if(values.skillCode.length < 1) {
            errors.skillCode = 'Panjang kode keahlian tidak boleh kurang dari satu huruf'
        }

        return errors;
    }

    onSubmit(values) {
        console.log("Here")
        if(this.state.id === '-1') {
            console.log("Create")
            EmployeeSkillService.createEmployeeSkill({
                employeeId:values.employeeId,
                skillCode:values.skillCode,
                active:"Y"
            }).then(() => this.props.history.push('/employeeSkills'))
        } else {
            console.log("Update")
            EmployeeSkillService.updateEmployeeSkill(this.state.id, {
                employeeId:values.employeeId,
                skillCode:values.skillCode,
                active:"Y"
            }).then(() => this.props.history.push('/employeeSkills'))
        }
    }

    render() {
        let {employeeId, skillCode} = this.state

        return (
            <div>
                <HeaderComponent/>
                <h4>Form Keahlian Karyawan</h4>
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
                                                <label>ID Karyawan</label>
                                                <Field className="form-control" type="text" name="employeeId"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Kode Keahlian</label>
                                                <Field className="form-control" type="text" name="skillCode"/>
                                            </fieldset>
                                            <button className="btn btn-success" type="submit">Simpan</button>
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