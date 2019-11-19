import React, {Component} from 'react';
import DataTable from 'react-data-table-component';
import EmployeeDataService from '../services/EmployeeDataService.js';
import FooterComponentList from './FooterComponentList.jsx';
import HeaderComponent from '../views/HeaderComponent.jsx';

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employees: [],
            employeesCustom: [],
            message:""
        }
        this.refreshEmployees = this.refreshEmployees.bind(this);
        this.deleteEmployeeClicked = this.deleteEmployeeClicked.bind(this);
        this.updateEmployeeClicked = this.updateEmployeeClicked.bind(this);
        this.addEmployeeClicked = this.addEmployeeClicked.bind(this);
    }

    componentDidMount() {
        this.refreshEmployees();
    }

    refreshEmployees() {
        EmployeeDataService.retrieveAllEmployees("name")
            .then(response =>
                response.data.map(
                    employee => {
                        const item = {
                            id: employee.employeeId,
                            employeeId: employee.employeeId,
                            name: employee.name,
                            email: employee.email,
                            role: employee.roleCode.roleName,
                            status: employee.employeeStatus,
                        }
                        this.setState(previousState => ({
                            employeesCustom: [...previousState.employeesCustom, item]
                        }))
                    }
                )
            )
    }

    deleteEmployeeClicked(id, name) {
        EmployeeDataService.deleteEmployee(id)
            .then(
                window.location.reload()                
            )
            .then(
                response => {
                    this.setState({message: `Karyawan berhasil dihapus`})
                }
            )
    }

    updateEmployeeClicked(id) {
        console.log("Update: " + id)
        this.props.history.push(`/employee/${id}`)
    }

    addEmployeeClicked() {
        this.props.history.push('/employee/-1')
    }

    render() {
        const columns = [
            {
                name: 'ID Karyawan',
                selector: 'employeeId',
                sortable: true,
            },
            {
                name: 'Nama',
                selector: 'name',
                sortable: true,
                left: true,
            },
            {
                name: 'Email',
                selector: 'email',
                sortable: true,
                left: true,
            },
            {
                name: 'Jabatan',
                selector: 'role',
                sortable: true,
                left: true,
            },
            {
                name: 'Status',
                selector: 'status',
                sortable: true,
                left: true,
            },
            {
                name: 'Ubah',
                button: true,
                cell: row => <button className="btn btn-sm btn-info" onClick={() => this.updateEmployeeClicked(row.id)}>Ubah</button>,
            },
            {
                name: 'Hapus',
                button: true,
                cell: row => <button className="btn btn-sm btn-danger" onClick={() => this.deleteEmployeeClicked(row.id)}>Hapus</button>,
            },
        ];
        return(
            <div>
                <HeaderComponent/>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <br/>
                    <h5>Daftar Karyawan</h5>
                    <DataTable
                        columns={columns}
                        data={this.state.employeesCustom}
                        pagination
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5]}
                        highlightOnHover
                        pointerOnHover
                    />
                    <div className="row">
                        <button className="btn btn-sm btn-info" onClick={() => this.addEmployeeClicked()}>Tambah Karyawan</button>
                    </div>
                </div>
                <FooterComponentList/>
            </div>
        )
    }
}

export default ListEmployeeComponent