import  axios from 'axios';

export const getBuildings = axios.create({
    baseURL: 'http://localhost:3001/buildings'
})

export default getBuildings;