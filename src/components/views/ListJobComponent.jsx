import React, {Component} from 'react';
import DataTable from 'react-data-table-component';
import JobDataService from '../services/JobDataService.js';
import FooterComponentList from './FooterComponentList.jsx';
import HeaderComponent from '../views/HeaderComponent.jsx';

class ListJobComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jobs: [],
            jobsCustom: [],
            message:""
        }
        this.refreshJobs = this.refreshJobs.bind(this);
        this.deleteJobClicked = this.deleteJobClicked.bind(this);
        this.updateJobClicked = this.updateJobClicked.bind(this);
        this.addJobClicked = this.addJobClicked.bind(this);
    }

    componentDidMount() {
        this.refreshJobs();
    }

    refreshJobs() {
        JobDataService.retrieveAllJobs("name")
            .then(response =>
                response.data.map(
                    job => {
                        const item = {
                            id: job.id,
                            jobCode: job.jobCode,
                            jobDescription: job.jobDescription,
                            shiftCode: job.shiftCode,
                            activityDate: job.activityDate,                            
                            startTime: job.startTime,
                            endTime: job.endTime,
                        }
                        this.setState(previousState => ({
                            jobsCustom: [...previousState.jobsCustom, item]
                        }))
                    }
                )
            )
    }

    deleteJobClicked(id, name) {
        JobDataService.deleteJob(id)
            .then(
                window.location.reload()                
            )
            .then(
                response => {
                    this.setState({message: `Pekerjaan berhasil dihapus`})
                }
            )
    }

    updateJobClicked(id) {
        console.log("Update: " + id)
        this.props.history.push(`/job/${id}`)
    }

    addJobClicked() {
        this.props.history.push('/job/-1')
    }

    render() {
        const columns = [
            {
                name: 'Kode Pekerjaan',
                selector: 'jobCode',
                sortable: true,
            },
            {
                name: 'Deskripsi Pekerjaan',
                selector: 'jobDescription',
                sortable: true,
                left: true,
            },
            {
                name: 'Shift',
                selector: 'shiftCode',
                sortable: true,
            },
            {
                name: 'Tanggal',
                selector: 'activityDate',
                sortable: true,
            },
            {
                name: 'Jam Mulai',
                selector: 'startTime',
                sortable: true,
                left: true,
            },
            {
                name: 'Jam Selesai',
                selector: 'endTime',
                sortable: true,
                left: true,
            },
            {
                name: 'Ubah',
                button: true,
                cell: row => <td><button className="btn btn-sm btn-info" onClick={() => this.updateJobClicked(row.id)}>Ubah</button></td>,
            },
            {
                name: 'Hapus',
                button: true,
                cell: row => <button className="btn btn-sm btn-danger" onClick={() => this.deleteJobClicked(row.id)}>Hapus</button>,
            },
        ];
        return(
            <div>
                <HeaderComponent/>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <br/>
                    <h5>Daftar Pekerjaan</h5>                    
                    <DataTable
                        columns={columns}
                        data={this.state.jobsCustom}
                        pagination
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5]}
                        highlightOnHover
                        pointerOnHover
                    />
                    <div className="row">
                        <button className="btn btn-sm btn-info" onClick={() => this.addJobClicked()}>Tambah Pekerjaan</button>
                    </div>                    
                </div>
                <FooterComponentList/>
            </div>
        )
    }
}

export default ListJobComponent