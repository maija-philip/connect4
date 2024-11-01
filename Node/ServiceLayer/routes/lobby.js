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

// GET /lobby
router.get("/", async function (req, res) {
  const result = await business.getAllLobbyMessages()

  if (result.error === error.somethingWentWrong) {
    res.status(500).json({ error: errorMsg });
    return;
  }
  if (result.error !== error.noError) {
    res.status(404).json({ error: errorMsg });
    return;
  }

  res.status(200).json({ messages: result.messages });
});

// POST /lobby/sendMessage
router.post("/sendMessage", async function (req, res) {
  // Content-Type': 'application/json
  //     { message: “message”, token: 123 }
  // 200 { message: “message sent” }
  // 404 { error: “token invalid” }
  // 500 { error: “something went wrong, please try again” }

  res.json({ message: "send message" });
});

// POST /lobby/sendGameRequest
router.post("/sendGameRequest", async function (req, res) {
  // Content-Type': 'application/json
  //     { username: "username", token: 123 }
  // 200 { message: “request sent” }
  // 400 { error:“make sure both usernames exist and are in the lobby”}
  // 500 { error: “something went wrong, please try again” }

  res.json({ message: "send game request" });
});

module.exports = router;
