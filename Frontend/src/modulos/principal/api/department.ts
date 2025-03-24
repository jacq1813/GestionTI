import axios from 'axios';

export const getDepartments = axios.create({
    baseURL: 'http://localhost:3001/departments'
})

export default getDepartments;