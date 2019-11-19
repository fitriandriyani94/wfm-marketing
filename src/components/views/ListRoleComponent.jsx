import React, {Component} from 'react';
import RoleDataService from '../services/RoleDataService.js';
import FooterComponentList from './FooterComponentList.jsx';
import HeaderComponent from '../views/HeaderComponent.jsx';
import DataTable from 'react-data-table-component';

class ListRoleComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roles: [],
            rolesCustom: [],
            message:""
        }
        this.refreshRoles = this.refreshRoles.bind(this);
        this.deleteRoleClicked = this.deleteRoleClicked.bind(this);
        this.updateRoleClicked = this.updateRoleClicked.bind(this);
        this.addRoleClicked = this.addRoleClicked.bind(this);
    }

    componentDidMount() {
        this.refreshRoles();
    }

    refreshRoles() {
        RoleDataService.retrieveAllRoles("name")
            .then(response =>
                response.data.map(
                    role => {
                        const item = {
                            id: role.roleCode,
                            roleCode: role.roleCode,
                            roleName: role.roleName,
                        }
                        this.setState(previousState => ({
                            rolesCustom: [...previousState.rolesCustom, item]
                        }))
                    }
                )
            )
    }

    deleteRoleClicked(id, name) {
        RoleDataService.deleteRole(id)
            .then(
                window.location.reload()                
            )
            .then(
                response => {
                    this.setState({message: `Keahlian berhasil dihapus`})
                }
            )
    }

    updateRoleClicked(id) {
        console.log("Update: " + id)
        this.props.history.push(`/role/${id}`)
    }

    addRoleClicked() {
        this.props.history.push('/role/-1')
    }

    render() {
        const columns = [
            {
                name: 'Kode Jabatan',
                selector: 'roleCode',
                sortable: true,
            },
            {
                name: 'Nama Jabatan',
                selector: 'roleName',
                sortable: true,
                left: true,
            },
            {
                name: 'Ubah',
                button: true,
                cell: row => <button className="btn btn-sm btn-info" onClick={() => this.updateRoleClicked(row.id)}>Ubah</button>,
            },
            {
                name: 'Hapus',
                button: true,
                cell: row => <button className="btn btn-sm btn-danger" onClick={() => this.deleteRoleClicked(row.id)}>Hapus</button>,
            },
        ];
        return(
            <div>
                <HeaderComponent/>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                <br/>
                <h5>Daftar Jabatan</h5>
                <DataTable
                        columns={columns}
                        data={this.state.rolesCustom}
                        pagination
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5]}
                        highlightOnHover
                        pointerOnHover
                    />
                    <div className="row">
                        <button className="btn btn-sm btn-info" onClick={() => this.addRoleClicked()}>Tambah Jabatan</button>
                    </div>
                </div>
                <FooterComponentList/>
            </div>
        )
    }
}

export default ListRoleComponent