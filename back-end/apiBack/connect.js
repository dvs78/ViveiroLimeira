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

const isProduction = process.env.NODE_ENV === "production";

// psql "postgres:Limao_10@localhost:5432/ViveiroLimeira" --set=sslmode=require

const pool = new pg.Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://postgres:Limao_10@localhost:5432/ViveiroLimeira",
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

pool
  .connect()
  .then(() => console.log("✅ Conectado ao PostgreSQL"))
  .catch((err) => console.error("❌ Erro ao conectar ao PostgreSQL:", err));

export default pool;
