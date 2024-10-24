/*
    Maija Philip
    Connect 4
*/

const express = require("express");
const router = express.Router();

const BusinessLogic = require("../../BusinessLogic/public/exports.js");
const business = new BusinessLogic();

const Error = require("../../BusinessLogic/public/errors.js");
const error = new Error();

const Sanitizer = require("../../BusinessLogic/sanitize.js");
const sanitizer = new Sanitizer();

// GET /user?username=”username”
router.get("/", async function (req, res) {
  // fast fail if username is not given
  if (!req.query || !req.query.hasOwnProperty("username")) {
    res.status(400).json({ error: "Please enter a username" });
    return;
  }
  const username = sanitizer.sanitize(req.query.username);

  // call backend to get data
  const errorMsg = await business.getUser(req.ip, username);
  if (errorMsg !== error.noError) {
    res.status(404).json({ error: errorMsg });
    return;
  }
  res.status(200).json({ message: `${username} is in the lobby` });
});

// POST user/verifyUser
router.post("/verifyUser", async function (req, res) {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    res.status(400).json({
      error: "Please enter a username and password as url encoded form params",
    });
    return;
  }

  username = sanitizer.sanitize(username);
  password = sanitizer.sanitize(password);

  const errorMsg = await business.validateLogin(req.ip, username, password);
  if (errorMsg !== error.noError) {
    res.status(404).json({ error: errorMsg });
    return;
  }
  res.status(200).json({ message: "Logged In" });
});

// POST user/createNewUser
router.post("/createNewUser", async function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let token = req.body.token;

  if (!username || !password) {
    res.status(400).json({
      error: "Please enter a username and password as url encoded form params",
    });
    return;
  }

  username = sanitizer.sanitize(username);
  password = sanitizer.sanitize(password);

  const errorMsg = await business.validateNewUserInfo(
    req.ip,
    req.headers["user-agent"],
    token,
    username,
    password
  );
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

// GET /user/createNewUser
router.get("/createNewUser", async function (req, res) {
  // call backend to get data
  const data = await business.getNewUserToken(req.ip, req.headers["user-agent"]);
  if (data.error !== error.noError) {
    res.status(404).json({ error: data.error });
    return;
  }
  res.status(200).json({ token: data.token });
});

module.exports = router;
