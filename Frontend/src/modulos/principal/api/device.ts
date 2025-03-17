import axios from 'axios';

export const getDevices = axios.create({
    baseURL: 'http://localhost:3001/devices'
})

export default getDevices;