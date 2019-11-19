import React, {Component} from 'react';
import SkillDataService from '../services/SkillDataService.js';
import FooterComponentList from './FooterComponentList.jsx';
import HeaderComponent from '../views/HeaderComponent.jsx';
import DataTable from 'react-data-table-component';

class ListSkillComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            skills: [],
            skillsCustom: [],
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
            .then(response =>
                response.data.map(
                    skill => {
                        const item = {
                            id: skill.skillCode,
                            skillCode: skill.skillCode,
                            skillName: skill.skillName,
                        }
                        this.setState(previousState => ({
                            skillsCustom: [...previousState.skillsCustom, item]
                        }))
                    }
                )
            )
    }

    deleteSkillClicked(id, name) {
        SkillDataService.deleteSkill(id)
            .then(
                window.location.reload()                
            )
            .then(
                response => {
                    this.setState({message: `Keahlian berhasil dihapus`})
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
        const columns = [
            {
                name: 'Kode Keahlian',
                selector: 'skillCode',
                sortable: true,
            },
            {
                name: 'Nama Keahlian',
                selector: 'skillName',
                sortable: true,
                left: true,
            },
            {
                name: 'Ubah',
                button: true,
                cell: row => <button className="btn btn-sm btn-info" onClick={() => this.updateSkillClicked(row.id)}>Ubah</button>,
            },
            {
                name: 'Hapus',
                button: true,
                cell: row => <button className="btn btn-sm btn-danger" onClick={() => this.deleteSkillClicked(row.id)}>Hapus</button>,
            },
        ];
        return(
            <div>
                <HeaderComponent/>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <br/>
                    <h5>Daftar Keahlian</h5>
                    <DataTable
                        columns={columns}
                        data={this.state.skillsCustom}
                        pagination
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5]}
                        highlightOnHover
                        pointerOnHover
                    />
                    <div className="row">
                        <button className="btn btn-sm btn-info" onClick={() => this.addSkillClicked()}>Tambah Keahlian</button>
                    </div>
                </div>
                <FooterComponentList/>
            </div>
        )
    }
}

export default ListSkillComponent