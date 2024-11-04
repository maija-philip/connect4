/*
    Maija Philip
    Connect 4
*/

const express = require("express");
const router = express.Router();

// GET /session
router.get("/", async function (req, res) {
  if (req.session.user == null) {
    res.status(404).json({ error: `No session` });
    return;
  }

  res.status(200).json({ message: `session secure`, username: req.session.user });
});

// POST /session/logout
router.post("/logout", async function (req, res) {
  if (req.session.user == null) {
    return res.redirect("/login");
  }

// TODO get username + remove username from lobby

  req.session.destroy();

  res.status(200).json({ message: `Logged out` });
});

module.exports = router;
