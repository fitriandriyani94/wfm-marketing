import axios from 'axios';

const HOST_API = 'https://workforce-app.herokuapp.com';
const SERVICE_API = `${HOST_API}/jobs`;

class JobDataService {
    retrieveAllJobs(name) {
        return axios.get(`${SERVICE_API}/list`);
    }
    deleteJob(id) {
        return axios.delete(`${SERVICE_API}/${id}`);
    }
    retrieveJob(id) {
        return axios.get(`${SERVICE_API}/${id}`);
    }
    updateJob(id, todo) {
        return axios.put(`${SERVICE_API}/${id}`, todo);
    }
    createJob(todo) {
        return axios.post(`${SERVICE_API}`, todo);
    }
}

export default new JobDataService();