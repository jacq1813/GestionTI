import axios from 'axios';

export const getDevicesT = axios.create({
    baseURL: 'http://localhost:3001/devicesT'
})

export default getDevicesT;