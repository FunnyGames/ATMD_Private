import axios from 'axios';
import config from '../config/config';

const instance = axios.create({
    baseURL: config.baseURL
});


instance.defaults.headers.common['Authorization'] = localStorage.getItem('token');

export default instance;