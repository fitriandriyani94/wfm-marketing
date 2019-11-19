import React, {Component} from 'react';
import DataTable from 'react-data-table-component';
import EmployeeSkillService from '../services/EmployeeSkillService.js';
import FooterComponentList from './FooterComponentList.jsx';
import HeaderComponent from '../views/HeaderComponent.jsx';

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employeeSkills: [],
            employeeSkillsCustom: [],
            message:""
        }
        this.refreshEmployeeSkills = this.refreshEmployeeSkills.bind(this);
        this.deleteEmployeeSkillClicked = this.deleteEmployeeSkillClicked.bind(this);
        this.updateEmployeeSkillClicked = this.updateEmployeeSkillClicked.bind(this);
        this.addEmployeeSkillClicked = this.addEmployeeSkillClicked.bind(this);
    }

    componentDidMount() {
        this.refreshEmployeeSkills();
    }

    refreshEmployeeSkills() {
        EmployeeSkillService.retrieveAllEmployeeSkills("name")
            .then(response =>
                response.data.map(
                    employeeSkill => {
                        const item = {
                            id: employeeSkill.id,
                            name: employeeSkill.employeeId,
                            skill: employeeSkill.skillCode,
                        }
                        this.setState(previousState => ({
                            employeeSkillsCustom: [...previousState.employeeSkillsCustom, item]
                        }))
                    }
                )
            )
    }

    deleteEmployeeSkillClicked(id, name) {
        EmployeeSkillService.deleteEmployeeSkill(id)
            .then(
                window.location.reload()                
            )
            .then(
                response => {
                    this.setState({message: `Keahlian karyawan berhasil dihapus`})
                }
            )
    }

    updateEmployeeSkillClicked(id) {
        this.props.history.push(`/employeeSkill/${id}`)
    }

    addEmployeeSkillClicked() {
        this.props.history.push('/employeeSkill/-1')
    }

    render() {
        const columns = [
            {
                name: 'Nama',
                selector: 'name',
                sortable: true,
            },
            {
                name: 'Keahlian',
                selector: 'skill',
                sortable: true,
                left: true,
            },
            {
                name: 'Ubah',
                button: true,
                cell: row => <button className="btn btn-sm btn-info" onClick={() => this.updateEmployeeSkillClicked(row.id)}>Ubah</button>,
            },
            {
                name: 'Hapus',
                button: true,
                cell: row => <button className="btn btn-sm btn-danger" onClick={() => this.deleteEmployeeSkillClicked(row.id)}>Hapus</button>,
            },
        ];
        return(
            <div>
                <HeaderComponent/>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <br/>
                    <h5>Daftar Keahlian Karyawan</h5>
                    <DataTable
                        columns={columns}
                        data={this.state.employeeSkillsCustom}
                        pagination
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5]}
                        highlightOnHover
                        pointerOnHover
                    />
                    <div className="row">
                        <button className="btn btn-info" onClick={() => this.addEmployeeSkillClicked()}>Add</button>
                    </div>
                </div>
                <FooterComponentList/>
            </div>
        )
    }
}

export default ListEmployeeComponent