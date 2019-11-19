import React, {Component} from 'react';
import moment from 'moment';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import EmployeeDataService from '../services/EmployeeDataService.js';
import FooterComponent from './FooterComponent.jsx';
import HeaderComponent from '../views/HeaderComponent.jsx';

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
            errors.name = 'Nama karyawan tidak boleh kosong'           
        } else if(values.name.length < 2) {
            errors.name = 'Panjang nama karyawan tidak boleh kurang dari dua huruf'
        }

        if(!values.email) {
            errors.email = 'Email karyawan tidak boleh kosong'           
        } else if(values.email.length < 15) {
            errors.email = 'Panjang email karyawan tidak boleh kurang dari lima belas huruf'
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
                employeeStatus:values.employeeStatus,
                roleCode:values.roleCode,
                active:"Y"
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
                employeeStatus:values.employeeStatus,
                roleCode:values.roleCode,
                active:"Y"
            }).then(() => this.props.history.push('/employees'))
        }
    }

    render() {
        let {employeeId, name, username, password, birthPlace, birthDate, address, gender, phoneNumber, email, joinDate, resignationDate, employeeStatus, roleCode} = this.state

        return (
            <div>
                <HeaderComponent/>
                <h4>Form Karyawan Baru</h4>
                <hr/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-1">
                        </div>
                        <div className="col-md-10">
                            <Formik 
                                initialValues={{employeeId, name, username, password, birthPlace, birthDate, address, gender, phoneNumber, email, joinDate, resignationDate, employeeStatus, roleCode}}
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
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <fieldset className="form-group">
                                                        <label>ID Karyawan</label>
                                                        <Field className="form-control" type="text" name="employeeId"/>
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <label>Nama</label>
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
                                                        <label>Tempat Lahir</label>
                                                        <Field className="form-control" type="text" name="birthPlace"/>
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <label>Tanggal Lahir</label>
                                                        <Field className="form-control" type="date" name="birthDate"/>
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <label>Alamat</label>
                                                        <Field className="form-control" type="text" name="address"/>
                                                    </fieldset>
                                                </div>
                                                <div className="col-md-6">                                            
                                                    <fieldset className="form-group">
                                                        <label>Jenis Kelamin</label>
                                                        <Field className="form-control" type="text" name="gender"/>
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <label>Nomor Telepon</label>
                                                        <Field className="form-control" type="text" name="phoneNumber"/>
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <label>Email</label>
                                                        <Field className="form-control" type="text" name="email"/>
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <label>Tanggal Bergabung</label>
                                                        <Field className="form-control" type="date" name="joinDate"/>
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <label>Tanggal Keluar</label>
                                                        <Field className="form-control" type="date" name="resignationDate"/>
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <label>Status Karyawan</label>
                                                        <Field className="form-control" type="text" name="employeeStatus"/>
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <label>Jabatan</label>
                                                        <Field className="form-control" type="text" name="roleCode"/>
                                                    </fieldset>
                                                </div>                                                
                                            </div>                                            
                                            <button className="btn btn-success" type="submit">Simpan</button>                                            
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

export default EmployeeComponent