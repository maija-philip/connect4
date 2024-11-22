/*
    Maija Philip
    Connect 4
*/

let express = require("express");
const router = express.Router();

const BusinessLogic = require("../../BusinessLogic/public/exports.js");
const business = new BusinessLogic();

const Error = require("../../BusinessLogic/public/errors.js");
const error = new Error();

const Sanitizer = require("../../BusinessLogic/sanitize.js");
const sanitizer = new Sanitizer();

// GET /game/{gameId}
router.get("/:gameId", async function (req, res) {
  const result = await business.getGame(req.params.gameId);

  if (result.error !== error.noError) {
    res.status(400).json({ error: result.error });
    return;
  }

  res.status(200).json({ game: result.game });
});

// TODO
// - change this one to get game messages

// POST /game/{gameId}/getMessages
router.get("/:gameId/getMessages", async function (req, res) {
  const result = await business.getAllGameMessages(req.params.gameId);

  if (result.error !== error.noError) {
    res.status(400).json({ error: result.error });
  }

  res.status(200).json({ messages: result.messages });
});

// POST /game/{gameId}/takeTurn
router.post("/:gameId/takeTurn", async function (req, res) {
  // take in move column and game id
  // get username from session

  if (req.body && !req.body.moveColumn) {
    res
      .status(400)
      .json({ error: "Must include 'moveColumn' in request body as JSON" });
    return;
  }

  let validMove = businessLayer.validateMove(req.params.gameId, req.body.moveColumn);
  if (!validMove.valid) {
    res
      .status(400)
      .json({
        error:
          "Must be a valid move. Board is 7x6 tiles and you can not move on top of other tiles",
      });
    return;
  }

  // Content-Type': 'application/json
  // 		{ token:  123, xMove: 0, yMove: 6 }
  // 200 { message: “Turn taken” }
  // 404 { error: “token invalid” }

  console.log(`Params: ${req.params.gameId}`);
  res
    .status(200)
    .json({
      message: "Turn Taken, Successfull Move",
      x: validMove.x,
      y: validMove.y,
    });
});

// POST /game/{gameId}/forfeit
router.post("/:gameId/forfeit", async function (req, res) {
  // Content-Type': 'application/json
  //     { token:  123 }
  // 200 { message: “Game ended, your opponent won” }
  // 404 { error: “token invalid” }

  console.log(`Params: ${req.params.gameId}`);
  res.json({ message: "forfeit" });
});

// TODO Don't need this, this will be done with websockets
// POST /game/{gameId}/sendMessage
router.post("/:gameId/sendMessage", async function (req, res) {
  // don't need to check if path params exist because it does that automatically
  if (req.body && !req.body.message) {
    res
      .status(400)
      .json({ error: "Must include 'message' in request body as JSON" });
    return;
  }

  // Content-Type': 'application/json
  // 		{ message: “message”, token: 123 }

  console.log(`Game Id: ${req.params.gameId}`);
  console.log(`Body: ${JSON.stringify(req.body)}`);

  res.status(200).json({ message: "Message Sent" });
  // res.status(401).json({ error: "Token Invalid"});
  // res.status(500).json({ error: "something went wrong, please try again"});
});

module.exports = router;
