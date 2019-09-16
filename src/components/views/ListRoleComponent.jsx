import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import RoleDataService from '../services/RoleDataService.js';
import FooterComponentList from './FooterComponentList.jsx';
import HeaderComponent from '../views/HeaderComponent.jsx';

class ListRoleComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roles: [],
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
            .then(
                response => {
                    this.setState({roles: response.data})
                }
            )
    }

    deleteRoleClicked(id, name) {
        RoleDataService.deleteRole(id)
            .then(
                response => {
                    this.setState({message: `Delete of role ${name} Successful`})
                    this.refreshRoles()
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
        return(
            <div>
                <HeaderComponent/>
                <h3>List Role</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <Table bordered striped hover size="sm">
                        <thead>
                            <tr>
                                <th>Role Code</th>
                                <th>Role Name</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.roles.map (
                                    role => 
                                    <tr key={role.roleCode}>
                                        <td>{role.roleCode}</td>
                                        <td>{role.roleName}</td>
                                        <td><button className="btn btn-sm btn-info" onClick={() => this.updateRoleClicked(role.roleCode)}>Update</button></td>
                                        <td><button className="btn btn-sm btn-danger" onClick={() => this.deleteRoleClicked(role.roleCode, role.roleName)}>Delete</button></td>
                                    </tr>
                                )
                            }                        
                        </tbody>
                    </Table>
                    <div className="row">
                        <button className="btn btn-info" onClick={() => this.addRoleClicked()}>Add</button>
                    </div>
                </div>
                <FooterComponentList/>
            </div>
        )
    }
}

export default ListRoleComponent