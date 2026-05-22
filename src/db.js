import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const dbConfig = {
  host: isProduction
    ? process.env.MYSQLHOST
    : process.env.DB_HOST || process.env.MYSQLHOST,

  port: Number(
    isProduction
      ? process.env.MYSQLPORT
      : process.env.DB_PORT || process.env.MYSQLPORT || 3306
  ),

  user: isProduction
    ? process.env.MYSQLUSER
    : process.env.DB_USER || process.env.MYSQLUSER,

  password: isProduction
    ? process.env.MYSQLPASSWORD
    : process.env.DB_PASSWORD || process.env.MYSQLPASSWORD,

  database: isProduction
    ? process.env.MYSQLDATABASE
    : process.env.DB_NAME || process.env.MYSQLDATABASE,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

console.log("Database config:", {
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  database: dbConfig.database
});

export const pool = mysql.createPool(dbConfig);