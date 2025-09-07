import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = await mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "root@123",
  database: process.env.DB_NAME || "campus_event_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;
