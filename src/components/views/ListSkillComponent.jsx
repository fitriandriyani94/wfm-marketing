import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import SkillDataService from '../services/SkillDataService.js';
import FooterComponentList from './FooterComponentList.jsx';
import HeaderComponent from '../views/HeaderComponent.jsx';

class ListSkillComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            skills: [],
            message:""
        }
        this.refreshSkills = this.refreshSkills.bind(this);
        this.deleteSkillClicked = this.deleteSkillClicked.bind(this);
        this.updateSkillClicked = this.updateSkillClicked.bind(this);
        this.addSkillClicked = this.addSkillClicked.bind(this);
    }

    componentDidMount() {
        this.refreshSkills();
    }

    refreshSkills() {
        SkillDataService.retrieveAllSkills("name")
            .then(
                response => {
                    this.setState({skills: response.data})
                }
            )
    }

    deleteSkillClicked(id, name) {
        SkillDataService.deleteSkill(id)
            .then(
                response => {
                    this.setState({message: `Delete of skill ${name} Successful`})
                    this.refreshSkills()
                }
            )
    }

    updateSkillClicked(id) {
        console.log("Update: " + id)
        this.props.history.push(`/skill/${id}`)
    }

    addSkillClicked() {
        this.props.history.push('/skill/-1')
    }

    render() {
        return(
            <div>
                <HeaderComponent/>
                <h3>List Skill</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <Table bordered striped hover size="sm">
                        <thead>
                            <tr>
                                <th>Skill Code</th>
                                <th>Skill Name</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.skills.map (
                                    skill => 
                                    <tr key={skill.skillCode}>
                                        <td>{skill.skillCode}</td>
                                        <td>{skill.skillName}</td>
                                        <td><button className="btn btn-sm btn-info" onClick={() => this.updateSkillClicked(skill.skillCode)}>Update</button></td>
                                        <td><button className="btn btn-sm btn-danger" onClick={() => this.deleteSkillClicked(skill.skillCode, skill.skillName)}>Delete</button></td>
                                    </tr>
                                )
                            }                        
                        </tbody>
                    </Table>
                    <div className="row">
                        <button className="btn btn-info" onClick={() => this.addSkillClicked()}>Add</button>
                    </div>
                </div>
                <FooterComponentList/>
            </div>
        )
    }
}

export default ListSkillComponent