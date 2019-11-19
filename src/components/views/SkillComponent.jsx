import React, {Component} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import SkillDataService from '../services/SkillDataService.js';
import FooterComponentList from './FooterComponentList.jsx';
import HeaderComponent from '../views/HeaderComponent.jsx';

class SkillComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            skillCode: '',
            skillName: ''        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {

        if(this.state.id === -1) {
            return
        }

        SkillDataService.retrieveSkill(this.state.id)
        .then(response => this.setState({
            skillCode:response.data.skillCode,
            skillName:response.data.skillName
        }))
    }

    validate(values) {
        let errors = {}
        
        if(!values.skillCode) {
            errors.skillCode = 'Kode keahlian tidak boleh kosong'           
        } else if(values.skillCode.length < 1) {
            errors.skillCode = 'Panjang kode keahlian tidak boleh kurang dari satu huruf'
        }

        if(!values.skillName) {
            errors.skillName = 'Nama keahlian tidak boleh kosong'           
        } else if(values.skillName.length < 7) {
            errors.skillName = 'Panjang nama keahlian tidak boleh kurang dari tujuh huruf'
        }

        return errors;
    }

    onSubmit(values) {
        console.log("Here")
        if(this.state.id === '-1') {
            console.log("Create")
            SkillDataService.createSkill({
                skillCode:values.skillCode,
                skillName:values.skillName,
                active:"Y"
            }).then(() => this.props.history.push('/skills'))
        } else {
            console.log("Update")
            SkillDataService.updateSkill(this.state.id, {
                skillCode:values.skillCode,
                skillName:values.skillName,
                active:"Y"
            }).then(() => this.props.history.push('/skills'))
        }
    }

    render() {
        let {skillCode, skillName} = this.state

        return (
            <div>
                <HeaderComponent/>
                <h4>Form Keahlian Baru</h4>
                <hr/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        </div>
                        <div className="col-md-6">
                            <Formik 
                                initialValues={{skillCode, skillName}}
                                onSubmit={this.onSubmit}
                                validateOnChange={false}
                                validateOnBlur={false}
                                validate={this.validate}
                                enableReinitialize={true}
                            >
                                {
                                    (props) => (
                                        <Form>
                                            <ErrorMessage name="skillCode" component="div" className="alert alert-warning"/>                                            
                                            <ErrorMessage name="skillName" component="div" className="alert alert-warning"/>
                                            <fieldset className="form-group">
                                                <label>Kode Keahlian</label>
                                                <Field className="form-control" type="text" name="skillCode"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Nama Keahlian</label>
                                                <Field className="form-control" type="text" name="skillName"/>
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

export default SkillComponent