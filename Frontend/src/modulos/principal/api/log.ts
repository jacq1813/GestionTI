import axios from 'axios';

export const getLogs = axios.create({
    baseURL: 'http://localhost:3001/logs'
})

export default getLogs;