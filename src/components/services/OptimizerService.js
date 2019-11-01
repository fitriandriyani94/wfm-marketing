import axios from 'axios';

const HOST_API = 'https://workforce-app.herokuapp.com';
const SERVICE_API = `${HOST_API}`;

class OptimizerService {
    getOptimizer() {
        return axios.get(`${SERVICE_API}/optimizer`);
    }

    getJobCount() {
        return axios.get(`${SERVICE_API}/job-count`);
    }

    getJobCategoryCount() {
        return axios.get(`${SERVICE_API}/job-category-count`);
    }

    getJobEmployeeCount() {
        return axios.get(`${SERVICE_API}/job-employee-count`);
    }
}

export default new OptimizerService();