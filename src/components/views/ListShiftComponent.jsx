import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import ShiftDataService from '../services/ShiftDataService.js';
import FooterComponentList from './FooterComponentList.jsx';

class ListShiftComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shifts: [],
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
            .then(
                response => {
                    this.setState({shifts: response.data})
                }
            )
    }

    deleteShiftClicked(id, name) {
        ShiftDataService.deleteShift(id)
            .then(
                response => {
                    this.setState({message: `Delete of shift ${name} Successful`})
                    this.refreshShifts()
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
        return(
            <div>
                <h3>List Shift</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <Table bordered striped hover size="sm">
                        <thead>
                            <tr>
                                <th>Shift Code</th>
                                <th>Shift Name</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.shifts.map (
                                    shift => 
                                    <tr key={shift.shiftCode}>
                                        <td>{shift.shiftCode}</td>
                                        <td>{shift.shiftName}</td>
                                        <td>{shift.startTime}</td>
                                        <td>{shift.endTime}</td>
                                        <td><button className="btn btn-sm btn-info" onClick={() => this.updateShiftClicked(shift.shiftCode)}>Update</button></td>
                                        <td><button className="btn btn-sm btn-danger" onClick={() => this.deleteShiftClicked(shift.shiftCode, shift.shiftName)}>Delete</button></td>
                                    </tr>
                                )
                            }                        
                        </tbody>
                    </Table>
                    <div className="row">
                        <button className="btn btn-info" onClick={() => this.addShiftClicked()}>Add</button>
                    </div>
                </div>
                <FooterComponentList/>
            </div>
        )
    }
}

export default ListShiftComponent