require('dotenv').config();
import mysql from 'mysql2/promise';
const HOST : string = process.env.HOST || 'localhost';
const USER : string = process.env.DB_USER || 'root';
const DB : string = process.env.DB || 'Gestion';
const PUERTO : number = parseInt(process.env.PUERTO || '3312');

const connection = mysql.createPool({
    host: HOST,
    user: USER,
    database: DB,
    port: PUERTO,
    multipleStatements:false
});

module.exports = connection;