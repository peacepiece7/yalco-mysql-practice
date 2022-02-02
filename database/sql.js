const mysql = require('mysql2');

const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  }
);
const promisePool = pool.promise();

const sql = {
  getSections: async () => {
    const [rows] = await promisePool.query(`
      SELECT * FROM sections
    `);
    return rows;
  },
  getBusinessesJoined: async (query) => {
    const sqlQuery = `
      SELECT * FROM sections S
      LEFT JOIN businesses B
        ON S.section_id = B.fk_section_id
      WHERE TRUE
        ${query.section ? 'AND section_id = ' + query.section : ''}
        ${query.floor ? 'AND floor = ' + query.floor : ''}
        ${query.status ? "AND status = '" + query.status + "'" : ''}
      ORDER BY
         ${query.order ? query.order : 'business_id'}
    `;
    console.log(sqlQuery);

    const [rows] = await promisePool.query(sqlQuery);
    return rows;
  },
};

module.exports = sql;
