/*
    Maija Philip
    Connect 4
*/

const express = require("express");
const router = express.Router();
const Database = require("./../../DataAccess/queries.js");
const db = new Database();


// GET /user?username=”username”
router.get("/", async function (req, res) {
  if (!req.query || !req.query.hasOwnProperty("username")) {
    res.status(400).json({ error: "Please enter a username" });
    return;
  }

  const username = req.query.username;
  // 200 { username: “username”, inLobby: true }
  // 404 { error: “this user does not exist” }

  const result = await db.getUser(username);
  console.log(result)

  res.status(200).json({ message: `Your username is: ${username}`, result: result });
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
