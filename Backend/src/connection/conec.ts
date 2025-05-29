require('dotenv').config();
import mysql from 'mysql2/promise';
const HOST: string = process.env.HOST || 'localhost';
const USER: string = process.env.DB_USER || 'root';
const DB: string = process.env.DB || 'gestion';
const PUERTO: number = parseInt(process.env.PUERTO || '3306');

const connection = mysql.createPool({
    host: HOST,
    user: USER,
    password: '@Disneyxa123',
    database: DB,
    port: PUERTO,
    multipleStatements: false
});

module.exports = connection;