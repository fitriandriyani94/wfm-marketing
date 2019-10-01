import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import EmployeeSkillService from '../services/EmployeeSkillService.js';
import FooterComponent from './FooterComponent.jsx';
import HeaderComponent from '../views/HeaderComponent.jsx';

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employeeSkills: [],
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
            .then(
                response => {
                    this.setState({employeeSkills: response.data})
                }
            )
    }

    deleteEmployeeSkillClicked(id, name) {
        EmployeeSkillService.deleteEmployeeSkill(id)
            .then(
                response => {
                    this.setState({message: `Delete of employee skill ${name} Successful`})
                    this.refreshEmployeeSkills()
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
        return(
            <div>
                <HeaderComponent/>
                <h3>List Employee Skill</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <Table bordered striped hover size="sm">
                        <thead>
                            <tr>
                                <th>Employee Name</th>
                                <th>Skill</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employeeSkills.map (
                                    employeeSkill => 
                                    <tr key={employeeSkill.id}>
                                        <td>{employeeSkill.employeeId}</td>
                                        <td>{employeeSkill.skillCode}</td>
                                        <td><button className="btn btn-sm btn-info" onClick={() => this.updateEmployeeSkillClicked(employeeSkill.id)}>Update</button></td>
                                        <td><button className="btn btn-sm btn-danger" onClick={() => this.deleteEmployeeSkillClicked(employeeSkill.id, employeeSkill.id)}>Delete</button></td>
                                    </tr>
                                )
                            }                        
                        </tbody>
                    </Table>
                    <div className="row">
                        <button className="btn btn-info" onClick={() => this.addEmployeeSkillClicked()}>Add</button>
                    </div>
                </div>
                <FooterComponent/>
            </div>
        )
    }
}

export default ListEmployeeComponent