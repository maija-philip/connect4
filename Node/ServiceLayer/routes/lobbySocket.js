/*
    Maija Philip
    Connect 4
*/

let express = require("express");
let router = express.Router();

const BusinessLogic = require("../../BusinessLogic/public/exports.js");
const business = new BusinessLogic();

const Error = require("../../BusinessLogic/public/errors.js");
const error = new Error();

const Sanitizer = require("../../BusinessLogic/sanitize.js");
const sanitizer = new Sanitizer();

// GET /lobby-socket
router.get("/", async function (req, res) {
  res.status(200).json({ messages: "Welcome to the lobby-socket" });
});

router.ws("/", function (ws, req) {
  ws.send({ username: "maijaphilip", message: "Hey there" });

  ws.on("message", function (msg) {
    console.log("message", msg);
    ws.send(msg);
  });
  console.log("socket", req.testing);
});

module.exports = router;
