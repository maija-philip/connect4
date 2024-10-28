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
  const errorMsg = await business.getUser(username);
  if (errorMsg !== error.noError) {
    res.status(404).json({ error: errorMsg });
    return;
  }

  // set up session
  req.session.user = username;
  req.session.save();
  console.log(req.session)

  res.status(200).json({ message: `${username} is in the lobby`, sessionUser: req.session.user });
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

  // set up session
  req.session.user = username;
  req.session.save();

  res.status(200).json({ message: "Logged In", username: username });
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
  // set up session
  req.session.user = username;
  req.session.save();

  res.status(200).json({ message: "Logged In", username: username });
});

module.exports = router;
