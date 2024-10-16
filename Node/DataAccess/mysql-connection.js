import mysql from "mysql2/promise";
import { Connector } from "@google-cloud/cloud-sql-connector";

// let mysql = require("mysql2/promise");
// let Connector = require("@google-cloud/cloud-sql-connector");

const connector = new Connector();
const clientOpts = await connector.getOptions({
  instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME,
  authType: "IAM",
});

const pool = await mysql.createPool({
  ...clientOpts,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

const conn = await pool.getConnection();
const [result] = await conn.query(`SELECT NOW();`);
console.table(result); // prints returned time value from server

await pool.end();
connector.close();
