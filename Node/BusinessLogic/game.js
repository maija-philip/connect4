/*
    Maija Philip
    Connect 4
*/

const Error = require("./public/errors.js");
const error = new Error();

const Database = require("./../DataAccess/queries.js");
const {
  PLAYER_PINK,
  PLAYER_YELLOW,
  NO_PLAYER,
  PLAYER_PINK_WINNING_SPOT,
  PLAYER_YELLOW_WINNING_SPOT,
  COLUMN_NUM,
  ROW_NUM,
} = require("./public/gameConsts.js");
const db = new Database();

async function createNewGame(sender, receiver) {
  console.log("Create new game");

  const startingGameboard = [
    new Array(COLUMN_NUM).fill(NO_PLAYER),
    new Array(COLUMN_NUM).fill(NO_PLAYER),
    new Array(COLUMN_NUM).fill(NO_PLAYER),
    new Array(COLUMN_NUM).fill(NO_PLAYER),
    new Array(COLUMN_NUM).fill(NO_PLAYER),
    new Array(COLUMN_NUM).fill(NO_PLAYER),
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

async function sendMessageInGameChat(user, message, gameId) {
  if (message.length > 200) {
    return error.messageTooLong;
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
  return { error: error.noError, messages: result };
}

async function forfeit(username, gameId) {
  result = await db.getGame(gameId);
  if (result.length < 1) {
    return { error: error.gameDNE };
  }

  let game = result[0];

  // check if username is player
  if (game.playerPink !==  username && game.playerYellow !== username ) {
    return { error: error.notYourGame };
  }

  // check if there is already a winner
  if (game.winner !== NO_PLAYER) {
    return { error: error.noTurnAfterWinner }
  }

  // set winner
  let winnerCode = game.playerPink === username ? 2 : 1
  await db.setWinner(gameId, winnerCode, game.gameboard);

  return {error: error.noError}
}

// on end of game
async function deleteGame(username, gameId) {
  game = await db.getGame(gameId);
  if (game.length < 1) {
    return { error: error.gameDNE };
  }

  if (game[0].playerPink !==  username && game[0].playerYellow !== username ) {
    return { error: error.notYourGame };
  }

  if (game[0].winner === NO_PLAYER) {
    return { error: error.canNotDeleteInProgressGame }
  }

  db.deleteGame(gameId);
  db.deleteGameMessages(gameId);
}

module.exports = {
  createNewGame,
  getGameFromDB,
  sendMessageInGameChat,
  getGameMessages,
  forfeit,
  deleteGame,
};
