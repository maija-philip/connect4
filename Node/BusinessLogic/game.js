/*
    Maija Philip
    Connect 4
*/

const Error = require("./public/errors.js");
const error = new Error();

const Database = require("./../DataAccess/queries.js");
const db = new Database();

const PLAYER_PINK = 1,
  PLAYER_YELLOW = 2,
  NO_PLAYER = 0;

async function createNewGame(sender, receiver) {
  console.log("Create new game");

  const startingGameboard = [
    new Array(7).fill(NO_PLAYER),
    new Array(7).fill(NO_PLAYER),
    new Array(7).fill(NO_PLAYER),
    new Array(7).fill(NO_PLAYER),
    new Array(7).fill(NO_PLAYER),
    new Array(7).fill(NO_PLAYER),
  ];

  let result = await db.createGame(
    sender,
    receiver,
    PLAYER_PINK,
    NO_PLAYER,
    JSON.stringify({ board: startingGameboard })
  );

  if (result.length < 1) {
    return error.somethingWentWrong;
  }

  const gameId = result.insertId;

  // remove players from lobby (they are no longer in the chat or available for game requests)
  result = await db.changeInLobbyStatus(false, sender);
  if (result.length < 1) {
    return { error: error.somethingWentWrong };
  }
  result = await db.changeInLobbyStatus(false, receiver);
  if (result.length < 1) {
    return { error: error.somethingWentWrong };
  }

  return { error: error.noError, gameId: gameId };
}

async function getGameFromDB(gameId) {
  result = await db.getGame(gameId);
  if (result.length < 1) {
    return { error: error.gameDNE };
  }

  return { error: error.noError, game: result };
}


async function sendGameMessage(user, message, gameId) {
  if (message.length > 200) {
    return error.messageTooLong
  }

  result = await db.sendGameMessage(user, gameId, message);
  if (result.length < 1) {
    return { error: error.somethingWentWrong };
  }

  return { error: error.noError, message: "sent" };
}

async function getGameMessages(gameId) {
  result = await db.getGame(gameId);
  if (result.length < 1) {
    return { error: error.gameDNE };
  }
  
  result = await db.getLobbyMessages();
  return { error: error.noError, messages: result}

}

async function move(column) {
  // check if it's within the board
  // 7 across
  // 6 down
  if (column < 0 || column > 7) {
    return { valid: false };
  }
  // check if it's empty
  // check if it should fall
  return { valid: true, x: 0, y: 0 };
}

// on end of game
function deleteGame(gameId) {
  db.deleteGame(gameId)
  db.deleteGameMessages(gameId)
}

module.exports = { createNewGame, getGameFromDB, sendGameMessage, getGameMessages, move, deleteGame };
