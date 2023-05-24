// db.js
const mysql = require('mysql2/promise');
const config = require('./config');

const pool = mysql.createPool(config.db);

module.exports = {
    query: async (sql, params) => {
        const connection = await pool.getConnection();
        try {
            const [results] = await connection.query(sql, params);
            connection.release();
            return results;
        } catch (err) {
            connection.release();
            throw err;
        }
    },
};