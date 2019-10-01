import axios from 'axios';

const HOST_API = 'https://workforce-app.herokuapp.com';
const SERVICE_API = `${HOST_API}/employeeSkills`;

class EmployeeDataService {
    retrieveAllEmployeeSkills(name) {
        return axios.get(`${SERVICE_API}/list`,);
    }
    deleteEmployeeSkill(id) {
        return axios.delete(`${SERVICE_API}/${id}`);
    }
    retrieveEmployeeSkill(id) {
        return axios.get(`${SERVICE_API}/${id}`);
    }
    updateEmployeeSkill(id, todo) {
        return axios.put(`${SERVICE_API}/${id}`, todo);
    }
    createEmployeeSkill(todo) {
        return axios.post(`${SERVICE_API}`, todo);
    }
}

export default new EmployeeDataService();