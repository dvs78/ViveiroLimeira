// import pg from "pg";

// const pool = new pg.Pool({
//   host: "localhost",
//   port: 5432,
//   user: "postgres",
//   password: "Limao_10",
//   database: "ViveiroLimeira",
// });

// export default pool;

import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool
  .connect()
  .then(() => console.log("✅ Conectado ao PostgreSQL"))
  .catch((err) => console.error("❌ Falha ao conectar ao PostgreSQL:", err));

export default pool;
