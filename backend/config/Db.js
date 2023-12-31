
const mysql = require('mysql2');
require('dotenv').config();
/**
 * Create mysql database pool on localhost
 */
module.exports = mysql.createPool({
    //host: "127.0.0.1",
    //user: "root",
    //password: "password",
    //database: "hotelbooking",
    host:process.env.HOST || 'localhost',
    user:process.env.USERDB || 'root',
    password:process.env.PASSWORD || 'password',
    database:process.env.DATABASE || 'hotelbooking',
    port: "3306",
    charset: "utf8", // Default database encode
    // acquireTimeout: 10000, // get connection Millisecond
    waitForConnections: true, // if true, connection queue will waiting can be used connect; if false immediately throw Error.
    connectionLimit: 10, // Maximum number of connections that can be created at a time
    queueLimit: 0 // The max request quantity. line up at the head of getConnection function. 0: unlimited
});
