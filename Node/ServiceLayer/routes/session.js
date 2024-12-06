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
    res.status(404).json({ error: `No session` });
    return;
  }

  const error = business.logout(req.session.user)
  if (error != error.noError) {
    res.status(500).json({ error: error });
    return
  }

  req.session.destroy();
  res.status(200).json({ message: `Logged out` });
});

module.exports = router;
