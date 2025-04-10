import axios from 'axios';

export const getBitacora = axios.create({
    baseURL: 'http://localhost:3001/bitacora',
})

export default getBitacora;