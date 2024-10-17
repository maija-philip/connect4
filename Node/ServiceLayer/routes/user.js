/*
    Maija Philip
    Connect 4
*/

const express = require("express");
const router = express.Router();

// DELETE THIS
const mysql = require("mysql2/promise");
const {Connector} = require('@google-cloud/cloud-sql-connector');

// GET /user?username=”username”
router.get("/", async function (req, res) {
  if (!req.query || !req.query.hasOwnProperty("username")) {
    res.status(400).json({ error: "Please enter a username" });
    return;
  }

  const username = req.query.username;
  // 200 { username: “username”, inLobby: true }
  // 404 { error: “this user does not exist” }

  // DELETE THIS
  const connector = new Connector();
  const clientOpts = await connector.getOptions({
    instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME,
    ipType: "PUBLIC"
    // authType: "IAM",
  });

  const pool = await mysql.createPool({
    ...clientOpts,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const conn = await pool.getConnection();

  const [result] = await conn.query(`SELECT * FROM connect_4_user `);
  console.table(result); // prints returned time value from server

  res.status(200).json({ message: `Your username is: ${username}` });
});

// POST user/verfiyUser
router.post("/verifyUser", async function (req, res) {
  // Content-Type: application/x-www-form-urlencoded
  // Payload: username, password
  // 200 { message: “logged in” }
  // 400 { message: “username or password is incorrect”}

  res.json({ message: "verify user" });
});

// POST user/createNewUser
router.post("/createNewUser", async function (req, res) {
  // Content-Type: application/x-www-form-urlencoded
  // Payload: username, password
  // 201 { message: “welcome” }
  // 400 { error: “please review the information and try again”}

  res.json({ message: "create new user" });
});

module.exports = router;
