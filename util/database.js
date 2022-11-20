const mysql = require('mysql2');

// createPool allows multiple connection to db thus enhancing the performance, than employing createConnection which only allows single connection
const pool = mysql.createPool({
    host: 'localhost', // Define where server running
    user: 'root', // DB username 
    password: '1234', // DB password
    database: 'node-lesson', // DB schema name
});

module.exports = pool.promise()