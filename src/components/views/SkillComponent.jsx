import React, {Component} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import SkillDataService from '../services/SkillDataService.js';
import FooterComponentList from './FooterComponentList.jsx';

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
            errors.skillCode = 'Enter a skill code'           
        } else if(values.skillCode.length < 1) {
            errors.skillCode = 'Enter at least 1 characters for skill code'
        }

        if(!values.skillName) {
            errors.skillName = 'Enter a skill name'           
        } else if(values.skillName.length < 4) {
            errors.skillName = 'Enter at least 4 characters for skill name'
        }

        return errors;
    }

    onSubmit(values) {
        console.log("Here")
        if(this.state.id === '-1') {
            console.log("Create")
            SkillDataService.createSkill({
                skillCode:values.skillCode,
                skillName:values.skillName
            }).then(() => this.props.history.push('/skills'))
        } else {
            console.log("Update")
            SkillDataService.updateSkill(this.state.id, {
                skillCode:values.skillCode,
                skillName:values.skillName
            }).then(() => this.props.history.push('/skills'))
        }
    }

    render() {
        let {skillCode, skillName} = this.state

        return (
            <div>
                <h1>Skill</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-md-1">
                        </div>
                        <div className="col-md-10">
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
                                                <label>Skill Code</label>
                                                <Field className="form-control" type="text" name="skillCode"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Skill Name</label>
                                                <Field className="form-control" type="text" name="skillName"/>
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
                <FooterComponentList/>
            </div>
        )
    }
}

export default SkillComponent