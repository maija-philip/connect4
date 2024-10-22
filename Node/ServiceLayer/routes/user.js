/*
    Maija Philip
    Connect 4
*/

const express = require("express");
const router = express.Router();

const BusinessLogic = require("../../BusinessLogic/exports.js");
const business = new BusinessLogic();

const Error = require("../../BusinessLogic/errors.js");
const error = new Error();

// GET /user?username=”username”
router.get("/", async function (req, res) {
  // fast fail if username is not given
  if (!req.query || !req.query.hasOwnProperty("username")) {
    res.status(400).json({ error: "Please enter a username" });
    return;
  }
  const username = req.query.username;

  // call backend to get data
  const errorMsg = await business.getUser(username);
  if (errorMsg !== error.noError) {
    res.status(404).json({ error: errorMsg });
    return;
  }
  res.status(200).json({ message: `${username} is in the lobby` });
});

// POST user/verifyUser
router.post("/verifyUser", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).json({ error: "Please enter a username and password as url encoded form params" });
    return;
  }

  const errorMsg = await business.validateLogin(username, password);
  if (errorMsg !== error.noError) {
    res.status(404).json({ error: errorMsg });
    return;
  }
  res.status(200).json({ message: "Logged In" });
});

// POST user/createNewUser
router.post("/createNewUser", async function (req, res) {

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).json({ error: "Please enter a username and password as url encoded form params" });
    return;
  }

  const errorMsg = await business.validateNewUserInfo(username, password);
  if (errorMsg === error.somethingWentWrong) {
    res.status(500).json({ error: errorMsg });
    return;
  }
  if (errorMsg !== error.noError) {
    res.status(404).json({ error: errorMsg });
    return;
  }
  res.status(200).json({ message: "Logged In" });
});

module.exports = router;
