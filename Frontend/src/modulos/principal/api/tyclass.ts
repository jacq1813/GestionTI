import axios from 'axios';

export const getTyClass = axios.create({
    baseURL: 'http://localhost:3001/TyClass'
})
export default getTyClass;