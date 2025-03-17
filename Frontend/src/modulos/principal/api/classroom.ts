import axios from 'axios';

export const getClassroom = axios.create({
    baseURL: 'http://localhost:3001/classrooms'
})

export default getClassroom;