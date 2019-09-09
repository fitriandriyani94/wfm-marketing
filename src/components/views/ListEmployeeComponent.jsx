import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import EmployeeDataService from '../services/EmployeeDataService.js';
import FooterComponentList from './FooterComponentList.jsx';

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employees: [],
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
            .then(
                response => {
                    this.setState({employees: response.data})
                }
            )
    }

    deleteEmployeeClicked(id, name) {
        EmployeeDataService.deleteEmployee(id)
            .then(
                response => {
                    this.setState({message: `Delete of employee ${name} Successful`})
                    this.refreshEmployees()
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
        return(
            <div>
                <h3>List Employee</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <Table bordered striped hover size="sm">
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Join Date</th>
                                <th>Status</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map (
                                    employee => 
                                    <tr key={employee.employeeId}>
                                        <td>{employee.employeeId}</td>
                                        <td>{employee.name}</td>
                                        <td>{employee.username}</td>
                                        <td>{employee.address}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.joinDate}</td>
                                        <td>{employee.employeeStatus}</td>
                                        <td><button className="btn btn-sm btn-info" onClick={() => this.updateEmployeeClicked(employee.employeeId)}>Update</button></td>
                                        <td><button className="btn btn-sm btn-danger" onClick={() => this.deleteEmployeeClicked(employee.employeeId, employee.name)}>Delete</button></td>
                                    </tr>
                                )
                            }                        
                        </tbody>
                    </Table>
                    <div className="row">
                        <button className="btn btn-info" onClick={() => this.addEmployeeClicked()}>Add</button>
                    </div>
                </div>
                <FooterComponentList/>
            </div>
        )
    }
}

export default ListEmployeeComponent