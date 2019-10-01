import axios from 'axios';

const HOST_API = 'https://workforce-app.herokuapp.com';
const SERVICE_API = `${HOST_API}`;

class OptimizerService {
    getOptimizer() {
        return axios.get(`${SERVICE_API}/optimizer`);
    }
}

export default new OptimizerService();