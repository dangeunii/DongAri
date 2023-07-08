const mysql = require('mysql2/promise');
const {logger} = require('./winston');

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
    host: '3.35.114.111',
    user: 'dang',
    port: '3306',
    password: 'dangeuni',
    database: 'dongariforest'
});

module.exports = {
    pool: pool
};