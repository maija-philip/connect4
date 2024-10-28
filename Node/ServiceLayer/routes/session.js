/*
    Maija Philip
    Connect 4
*/

const express = require("express");
const router = express.Router();

// GET /session
router.get("/", async function (req, res) {
  console.log(req.session);
  if (req.session.user == null) {
    res.redirect("/login");
    return;
  }

  res.status(200).json({ message: `session secure` });
});

// POST /session/logout
router.post("/", async function (req, res) {
  if (req.session.user == null) {
    return res.redirect("/login");
  }

  req.session.destroy();

  res.status(200).json({ message: `Logged out` });
});

module.exports = router;
