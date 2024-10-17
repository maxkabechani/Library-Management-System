import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/student/',
    withCredentials: true,
});

export default instance;