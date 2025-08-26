const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
  database: process.env.MYSQL_DATABASE || 'erp_pes',
  port: process.env.MYSQL_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  charset: 'utf8mb4',
  // remove invalid options: timeout, reconnect
};

let pool = null;

async function getConnection() {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

async function query(sql, params) {
  const connection = await getConnection();
  const [rows] = await connection.promise().execute(sql, params);
  return rows;
}

async function closeConnection() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

module.exports = {
  getConnection,
  query,
  closeConnection
};
