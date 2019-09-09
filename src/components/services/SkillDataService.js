import axios from 'axios';

const HOST_API = 'https://workforce-app.herokuapp.com/';
const SERVICE_API = `${HOST_API}/skills`;

class SkillDataService {
    retrieveAllSkills(name) {
        return axios.get(`${SERVICE_API}/list`);
    }
    deleteSkill(id) {
        return axios.delete(`${SERVICE_API}/${id}`);
    }
    retrieveSkill(id) {
        return axios.get(`${SERVICE_API}/${id}`);
    }
    updateSkill(id, todo) {
        return axios.put(`${SERVICE_API}/${id}`, todo);
    }
    createSkill(todo) {
        return axios.post(`${SERVICE_API}`, todo);
    }
}

export default new SkillDataService();