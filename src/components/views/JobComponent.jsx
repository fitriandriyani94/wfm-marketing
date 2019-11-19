import React, {Component} from 'react';
import moment from 'moment';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import JobDataService from '../services/JobDataService.js';
import FooterComponentList from './FooterComponentList.jsx';
import HeaderComponent from '../views/HeaderComponent.jsx';

class JobComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            jobCode: '',
            jobDescription: '',
            shiftCode: '',
            activityDate: '',
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
            jobDescription:response.data.jobDescription,
            shiftCode:response.data.shiftCode,
            activityDate:moment(response.data.activityDate).format('YYYY-MM-DD'),
            instance:response.data.instance,
            classCount:response.data.classCount,
            startTime:response.data.startTime,
            endTime:response.data.endTime,
            employeeId:response.data.employeeId
        }))
    }

    validate(values) {
        let errors = {}
        
        if(!values.jobDescription) {
            errors.jobDescription = 'Deskripsi pekerjaan tidak boleh kosong'           
        } else if(values.jobDescription.length < 7) {
            errors.jobDescription = 'Panjang deskripsi pekerjaan tidak boleh kurang dari tujuh huruf'
        }

        if(!values.jobCode) {
            errors.jobCode = 'Kode pekerjaan tidak boleh kosong'           
        } else if(values.jobCode.length < 1) {
            errors.jobCode = 'Panjang kode pekerjaan tidak boleh kurang dari satu huruf'
        }

        return errors;
    }

    onSubmit(values) {
        console.log("Here")
        if(this.state.id === '-1') {
            console.log("Create")
            JobDataService.createJob({
                jobCode:values.jobCode,
                jobDescription:values.jobDescription,
                shiftCode:values.shiftCode,
                activityDate:values.activityDate,
                instance:values.instance,
                classCount:values.classCount,
                startTime:values.startTime,
                endTime:values.endTime,
                employeeId:values.employeeId,
                active:"Y"
            }).then(() => this.props.history.push('/jobs'))
        } else {
            console.log("Update")
            JobDataService.updateJob(this.state.id, {
                jobCode:values.jobCode,
                jobDescription:values.jobDescription,
                shiftCode:values.shiftCode,
                activityDate:values.activityDate,
                instance:values.instance,
                classCount:values.classCount,
                startTime:values.startTime,
                endTime:values.endTime,
                employeeId:values.employeeId,
                active:"Y"
            }).then(() => this.props.history.push('/jobs'))
        }
    }

    render() {
        let {jobCode, jobDescription, shiftCode, activityDate, instance, classCount, startTime, endTime, employeeId} = this.state

        return (
            <div>
                <HeaderComponent/>
                <h4>Form Pekerjaan Baru</h4>
                <div className="container">
                    <div className="row">
                        <div className="col-md-1">
                        </div>
                        <div className="col-md-10">
                            <Formik 
                                initialValues={{jobCode, jobDescription, shiftCode, activityDate, instance, classCount, startTime, endTime, employeeId}}
                                onSubmit={this.onSubmit}
                                validateOnChange={false}
                                validateOnBlur={false}
                                validate={this.validate}
                                enableReinitialize={true}
                            >
                                {
                                    (props) => (
                                        <Form>
                                            <ErrorMessage name="jobDescription" component="div" className="alert alert-warning"/>                                            
                                            <ErrorMessage name="jobCode" component="div" className="alert alert-warning"/>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <fieldset className="form-group">
                                                        <label>Kode Pekerjaan</label>
                                                        <Field className="form-control" type="text" name="jobCode"/>
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <label>Deskripsi Pekerjaan</label>
                                                        <Field className="form-control" type="text" name="jobDescription"/>
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <label>Kode Shift</label>
                                                        <Field className="form-control" type="text" name="shiftCode"/>
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <label>Tanggal</label>
                                                        <Field className="form-control" type="date" name="activityDate"/>
                                                    </fieldset>
                                                </div>
                                                <div className="col-md-6">
                                                    <fieldset className="form-group">
                                                        <label>Instansi</label>
                                                        <Field className="form-control" type="text" name="instance"/>
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <label>Jumlah Kelas</label>
                                                        <Field className="form-control" type="text" name="classCount"/>
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <label>Jam Mulai</label>
                                                        <Field className="form-control" type="time" name="startTime"/>
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <label>Jam Selesai</label>
                                                        <Field className="form-control" type="time" name="endTime"/>
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
                <FooterComponentList/>
            </div>
        )
    }
}

export default JobComponent