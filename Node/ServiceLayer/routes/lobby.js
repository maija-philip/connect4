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
  const result = await business.getAllLobbyMessages();
  res.status(200).json({ messages: result });
});

// POST /lobby/sendMessage
router.post("/sendMessage", async function (req, res) {
  let username = req.session.user;
  let message = req.body.message;

  if (!username) {
    res.status(404).json({ error: `No session` });
    return;
  }

  if (!message) {
    res.status(400).json({
      error: "Please enter a message as json param",
    });
    return;
  }

  message = sanitizer.sanitize(message);

  const errorMsg = await business.sendMessage(username, message);
  if (errorMsg === error.somethingWentWrong) {
    res.status(500).json({ error: errorMsg });
    return;
  }
  if (errorMsg !== error.noError) {
    res.status(404).json({ error: errorMsg });
    return;
  }

  res
    .status(200)
    .json({ status: "Sent", username: username, message: message });
});

// POST /lobby/acceptGameRequest
router.post("/acceptGameRequest", async function (req, res) {
  let user = req.session.user;
  let sender = req.body.sender;
  let receiver = req.body.receiver;

  if (!sender || !receiver || !user) {
    res.status(400).json({
      error: "Must include body params, sender & receiver in JSON format",
    });
    return;
  }

  sender = sanitizer.sanitize(sender);
  receiver = sanitizer.sanitize(receiver);

  if (sender !== user && receiver !== user) {
    res.status(400).json({ error: "Invalid sender and receiver" });
    return;
  }

  const result = await business.acceptGameRequest(sender, receiver);

  if (result.error === error.somethingWentWrong) {
    res.status(500).json({ error: result.error });
    return;
  }
  if (result.error !== error.noError) {
    res.status(400).json({ error: result.error });
    return;
  }

  res.status(200).json({ gameId: result.gameId });
});

module.exports = router;
