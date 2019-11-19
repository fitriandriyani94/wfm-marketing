import React, {Component} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import ShiftDataService from '../services/ShiftDataService.js';
import FooterComponentList from './FooterComponentList.jsx';
import HeaderComponent from '../views/HeaderComponent.jsx';

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
            errors.shiftCode = 'Kode shift tidak boleh kosong'           
        } else if(values.shiftCode.length < 2) {
            errors.shiftCode = 'Panjang kode shift tidak boleh kurang dari dua huruf'
        }

        if(!values.shiftName) {
            errors.shiftName = 'Nama shift tidak boleh kosong'           
        } else if(values.shiftName.length < 4) {
            errors.shiftName = 'Panjang nama shift tidak boleh kurang dari empat huruf'
        }

        return errors;
    }

    onSubmit(values) {
        if(this.state.id === '-1') {
            console.log("Create")
            ShiftDataService.createShift({
                shiftCode:values.shiftCode,
                shiftName:values.shiftName,
                startTime:values.startTime,
                endTime:values.endTime,
                active:"Y"
            }).then(() => this.props.history.push('/shifts'))
        } else {
            console.log("Update")
            ShiftDataService.updateShift(this.state.id, {
                shiftCode:values.shiftCode,
                shiftName:values.shiftName,
                startTime:values.startTime,
                endTime:values.endTime,
                active:"Y"
            }).then(() => this.props.history.push('/shifts'))
        }
    }

    render() {
        let {shiftCode, shiftName, startTime, endTime} = this.state

        return (
            <div>
                <HeaderComponent/>
                <h4>Form Shift Baru</h4>
                <hr/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        </div>
                        <div className="col-md-6">
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
                                                <label>Kode Shift</label>
                                                <Field className="form-control" type="text" name="shiftCode"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Nama Shift</label>
                                                <Field className="form-control" type="text" name="shiftName"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Jam Mulai</label>
                                                <Field className="form-control" type="time" name="startTime"/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Jam Selesai</label>
                                                <Field className="form-control" type="time" name="endTime"/>
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

export default ShiftComponent