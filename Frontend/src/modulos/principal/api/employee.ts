import axios from 'axios';

export const getEmployees = axios.create({
    baseURL: 'http://localhost:3001/employees'
})

export default getEmployees;