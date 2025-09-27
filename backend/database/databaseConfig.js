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
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4',
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
  // These options help with prepared statement issues
  supportBigNumbers: true,
  bigNumberStrings: true,
  dateStrings: false,
  debug: false,
  trace: false,
  multipleStatements: false,
  // Add SQL mode to be more permissive with parameter binding
  typeCast: function (field, next) {
    if (field.type === 'TINY' && field.length === 1) {
      return (field.string() === '1'); // 1 = true, 0 = false
    }
    return next();
  }
};

let pool = null;

async function getConnection() {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
    console.log('Database connection pool created.');
    
    // Test the connection
    try {
      const connection = await pool.promise().getConnection();
      console.log('Database connection tested successfully');
      connection.release();
    } catch (error) {
      console.error('Database connection test failed:', error);
      throw error;
    }
  }
  return pool;
}

async function query(sql, params = []) {
  try {
    const connection = await getConnection();
    
    // For queries with LIMIT/OFFSET, use a different approach
    if (sql.includes('LIMIT ?') || sql.includes('OFFSET ?')) {
      console.log('Using alternative query method for LIMIT/OFFSET');
      // Get a single connection and use it directly
      const conn = await connection.promise().getConnection();
      try {
        const [rows] = await conn.execute(sql, params);
        return rows;
      } finally {
        conn.release();
      }
    } else {
      const [rows] = await connection.promise().execute(sql, params);
      return rows;
    }
  } catch (err) {
    console.error('DB Query Error:', err.message);
    console.error('SQL:', sql);
    console.error('Params:', params);
    throw err;
  }
}

// Alternative query method specifically for problematic queries
async function queryDirect(sql, params = []) {
  try {
    const connection = await getConnection();
    const conn = await connection.promise().getConnection();
    try {
      const [rows] = await conn.query(sql, params);
      return rows;
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('DB Direct Query Error:', err.message);
    console.error('SQL:', sql);
    console.error('Params:', params);
    throw err;
  }
}

async function closeConnection() {
  if (pool) {
    await pool.end();
    pool = null;
    console.log('Database connection pool closed.');
  }
}

module.exports = {
  getConnection,
  query,
  queryDirect,
  closeConnection
};