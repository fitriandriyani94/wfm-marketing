import React, {Component} from 'react';
import DataTable from 'react-data-table-component';
import ShiftDataService from '../services/ShiftDataService.js';
import FooterComponentList from './FooterComponentList.jsx';
import HeaderComponent from '../views/HeaderComponent.jsx';

class ListShiftComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shifts: [],
            shiftsCustom: [],
            message:""
        }
        this.refreshShifts = this.refreshShifts.bind(this);
        this.deleteShiftClicked = this.deleteShiftClicked.bind(this);
        this.updateShiftClicked = this.updateShiftClicked.bind(this);
        this.addShiftClicked = this.addShiftClicked.bind(this);
    }

    componentDidMount() {
        this.refreshShifts();
    }

    refreshShifts() {
        ShiftDataService.retrieveAllShifts("name")
            .then(response =>
                response.data.map(
                    shift => {
                        const item = {
                            id: shift.shiftCode,
                            shiftCode: shift.shiftCode,
                            shiftName: shift.shiftName,
                            startTime: shift.startTime,
                            endTime: shift.endTime,
                        }
                        this.setState(previousState => ({
                            shiftsCustom: [...previousState.shiftsCustom, item]
                        }))
                    }
                )
            )
    }

    deleteShiftClicked(id, name) {
        ShiftDataService.deleteShift(id)
            .then(
                window.location.reload()                
            )
            .then(
                response => {
                    this.setState({message: `Shift berhasil dihapus`})
                }
            )
    }

    updateShiftClicked(id) {
        console.log("Update: " + id)
        this.props.history.push(`/shift/${id}`)
    }

    addShiftClicked() {
        this.props.history.push('/shift/-1')
    }

    render() {
        const columns = [
            {
                name: 'Kode Shift',
                selector: 'shiftCode',
                sortable: true,
            },
            {
                name: 'Nama Shift',
                selector: 'shiftName',
                sortable: true,
                left: true,
            },
            {
                name: 'Jam Mulai',
                selector: 'startTime',
                sortable: true,
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
                cell: row => <td><button className="btn btn-sm btn-info" onClick={() => this.updateShiftClicked(row.id)}>Ubah</button></td>,
            },
            {
                name: 'Hapus',
                button: true,
                cell: row => <button className="btn btn-sm btn-danger" onClick={() => this.deleteShiftClicked(row.id)}>Hapus</button>,
            },
        ];
        return(
            <div>
                <HeaderComponent/>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <br/>
                    <h5>Daftar Shift</h5>
                    <DataTable
                        columns={columns}
                        data={this.state.shiftsCustom}
                        pagination
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5]}
                        highlightOnHover
                        pointerOnHover
                    />
                    <div className="row">
                        <button className="btn btn-sm btn-info" onClick={() => this.addShiftClicked()}>Tambah Shift</button>
                    </div>
                </div>
                <FooterComponentList/>
            </div>
        )
    }
}

export default ListShiftComponent