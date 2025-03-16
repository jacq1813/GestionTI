import axios from 'axios';

export const getIncidents = axios.create({
    baseURL: 'http://localhost:3001/incidents/recandemi'
})

export default getIncidents;