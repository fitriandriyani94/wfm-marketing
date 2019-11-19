import React, {Component} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import RoleDataService from '../services/RoleDataService.js';
import FooterComponentList from './FooterComponentList.jsx';
import HeaderComponent from '../views/HeaderComponent.jsx';

class RoleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            roleCode: '',
            roleName: ''        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {

        if(this.state.id === -1) {
            return
        }

        RoleDataService.retrieveRole(this.state.id)
        .then(response => this.setState({
            roleCode:response.data.roleCode,
            roleName:response.data.roleName
        }))
    }

    validate(values) {
        let errors = {}
        
        if(!values.roleCode) {
            errors.roleCode = 'Kode jabatan tidak boleh kosong'           
        } else if(values.roleCode.length < 3) {
            errors.roleCode = 'Panjang kode jabatan tidak boleh kurang dari tiga huruf'
        }

        if(!values.roleName) {
            errors.roleName = 'Nama jabatan tidak boleh kosong'           
        } else if(values.roleName.length < 5) {
            errors.roleName = 'Panjang nama jabatan tidak boleh kurang dari lima huruf'
        }

        return errors;
    }

    onSubmit(values) {
        console.log("Here")
        if(this.state.id === '-1') {
            console.log("Create")
            RoleDataService.createRole({
                roleCode:values.roleCode,
                roleName:values.roleName,
                active:"Y"
            }).then(() => this.props.history.push('/roles'))
        } else {
            console.log("Update")
            RoleDataService.updateRole(this.state.id, {
                roleCode:values.roleCode,
                roleName:values.roleName,
                active:"Y"
            }).then(() => this.props.history.push('/roles'))
        }
    }

    render() {
        let {roleCode, roleName} = this.state

        return (
            <div>
                <HeaderComponent/>
                <h4>Form Jabatan Baru</h4>
                <hr/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        </div>
                        <div className="col-md-6">
                            <Formik 
                                initialValues={{roleCode, roleName}}
                                onSubmit={this.onSubmit}
                                validateOnChange={false}
                                validateOnBlur={false}
                                validate={this.validate}
                                enableReinitialize={true}
                            >
                                {
                                    (props) => (
                                        <Form>
                                            <ErrorMessage name="roleCode" component="div" className="alert alert-warning"/>                                            
                                            <ErrorMessage name="roleName" component="div" className="alert alert-warning"/>
                                            <fieldset className="form-group">
                                                <label>Kode Jabatan</label>
                                                <Field className="form-control" type="text" name="roleCode"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Nama Jabatan</label>
                                                <Field className="form-control" type="text" name="roleName"/>
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

export default RoleComponent