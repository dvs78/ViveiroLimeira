// import pg from "pg";

// const pool = new pg.Pool({
//   host: "localhost",
//   port: 5432,
//   user: "postgres",
//   password: "Limao_10",
//   database: "ViveiroLimeira",
// });

// export default pool;

// console.log((await pool.query("SELECT * FROM clientes")).rows);

import pg from "pg";
import "dotenv/config";
const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
export default pool;
