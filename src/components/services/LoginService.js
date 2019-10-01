import axios from 'axios';

const HOST_API = 'https://workforce-app.herokuapp.com';
const SERVICE_API = `${HOST_API}`;

class LoginService {
    getLogin(loginData) {
        return axios.post(`${SERVICE_API}/login`, loginData);
    }
}

export default new LoginService();