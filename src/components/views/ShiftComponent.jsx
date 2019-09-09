import React, {Component} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import ShiftDataService from '../services/ShiftDataService.js';
import FooterComponentList from './FooterComponentList.jsx';

class ShiftComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            shiftCode: '',
            shiftName: '',
            startTime: '',
            endTime: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {

        if(this.state.id === -1) {
            return
        }

        ShiftDataService.retrieveShift(this.state.id)
        .then(response => this.setState({
            shiftCode:response.data.shiftCode,
            shiftName:response.data.shiftName,
            startTime:response.data.startTime,
            endTime:response.data.endTime
        }))
    }

    validate(values) {
        let errors = {}
        
        if(!values.shiftCode) {
            errors.shiftCode = 'Enter a shift code'           
        } else if(values.shiftCode.length < 1) {
            errors.shiftCode = 'Enter at least 1 characters for shift code'
        }

        if(!values.shiftName) {
            errors.shiftName = 'Enter a shift name'           
        } else if(values.shiftName.length < 4) {
            errors.shiftName = 'Enter at least 4 characters for shift name'
        }

        return errors;
    }

    onSubmit(values) {
        console.log("Here")
        if(this.state.id === '-1') {
            console.log("Create")
            ShiftDataService.createShift({
                shiftCode:values.shiftCode,
                shiftName:values.shiftName,
                startTime:values.startTime,
                endTime:values.endTime
            }).then(() => this.props.history.push('/shifts'))
        } else {
            console.log("Update")
            ShiftDataService.updateShift(this.state.id, {
                shiftCode:values.shiftCode,
                shiftName:values.shiftName,
                startTime:values.startTime,
                endTime:values.endTime
            }).then(() => this.props.history.push('/shifts'))
        }
    }

    render() {
        let {shiftCode, shiftName, startTime, endTime} = this.state

        return (
            <div>
                <h1>Shift</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-md-1">
                        </div>
                        <div className="col-md-10">
                            <Formik 
                                initialValues={{shiftCode, shiftName, startTime, endTime}}
                                onSubmit={this.onSubmit}
                                validateOnChange={false}
                                validateOnBlur={false}
                                validate={this.validate}
                                enableReinitialize={true}
                            >
                                {
                                    (props) => (
                                        <Form>
                                            <ErrorMessage name="shiftCode" component="div" className="alert alert-warning"/>                                            
                                            <ErrorMessage name="shiftName" component="div" className="alert alert-warning"/>
                                            <fieldset className="form-group">
                                                <label>Shift Code</label>
                                                <Field className="form-control" type="text" name="shiftCode"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Shift Name</label>
                                                <Field className="form-control" type="text" name="shiftName"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Start Time</label>
                                                <Field className="form-control" type="time" name="startTime"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>End Time</label>
                                                <Field className="form-control" type="time" name="endTime"/>
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

export default ShiftComponent