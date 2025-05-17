import axios from 'axios';

export const getProblemas = axios.create({
    baseURL: 'http://localhost:3001/Sproblems',
})

export default getProblemas;