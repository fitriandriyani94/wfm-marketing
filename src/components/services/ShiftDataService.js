import axios from 'axios';

const HOST_API = 'https://workforce-app.herokuapp.com/';
const SERVICE_API = `${HOST_API}/shifts`;

class ShiftDataService {
    retrieveAllShifts(name) {
        return axios.get(`${SERVICE_API}/list`);
    }
    deleteShift(id) {
        return axios.delete(`${SERVICE_API}/${id}`);
    }
    retrieveShift(id) {
        return axios.get(`${SERVICE_API}/${id}`);
    }
    updateShift(id, todo) {
        return axios.put(`${SERVICE_API}/${id}`, todo);
    }
    createShift(todo) {
        return axios.post(`${SERVICE_API}`, todo);
    }
}

export default new ShiftDataService();