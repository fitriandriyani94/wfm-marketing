import axios from 'axios';

const HOST_API = 'https://workforce-app.herokuapp.com/';
const SERVICE_API = `${HOST_API}/employees`;

class EmployeeDataService {
    retrieveAllEmployees(name) {
        return axios.get(`${SERVICE_API}/list`,);
    }
    deleteEmployee(id) {
        return axios.delete(`${SERVICE_API}/${id}`);
    }
    retrieveEmployee(id) {
        return axios.get(`${SERVICE_API}/${id}`);
    }
    updateEmployee(id, todo) {
        return axios.put(`${SERVICE_API}/${id}`, todo);
    }
    createEmployee(todo) {
        return axios.post(`${SERVICE_API}`, todo);
    }
}

export default new EmployeeDataService();