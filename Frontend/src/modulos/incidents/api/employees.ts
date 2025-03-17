import axios from "axios";

export const getTechEmployees = axios.create({
    baseURL: 'http://localhost:3001/employees/tech'
})

export default getTechEmployees;