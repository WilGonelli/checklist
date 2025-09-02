import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

const db = process.env;
const sql = postgres(
  `postgres://${db.DB_USER}:${db.DB_PASSWORD}@${db.DB_HOST}:${db.DB_PORT}/${db.DB_DATABASE}`
);

export default sql;
