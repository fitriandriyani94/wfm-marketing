import axios from 'axios';

const HOST_API = 'https://workforce-app.herokuapp.com';
const SERVICE_API = `${HOST_API}/roles`;

class RoleDataService {
    retrieveAllRoles(name) {
        return axios.get(`${SERVICE_API}/list`);
    }
    deleteRole(id) {
        return axios.delete(`${SERVICE_API}/${id}`);
    }
    retrieveRole(id) {
        return axios.get(`${SERVICE_API}/${id}`);
    }
    updateRole(id, todo) {
        return axios.put(`${SERVICE_API}/${id}`, todo);
    }
    createRole(todo) {
        return axios.post(`${SERVICE_API}`, todo);
    }
}

export default new RoleDataService();