import axios from 'axios';

export const getIncidents = axios.create({
    baseURL: 'http://localhost:3001/incidents'
})

export default getIncidents;
