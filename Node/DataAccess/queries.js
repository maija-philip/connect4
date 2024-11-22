/*
    Maija Philip
    Connect 4
*/

const Connection = require("./connection.js");
const conn = new Connection();

// export to api request
module.exports = function () {

  // REGISTRATION TOKENS
  this.saveToken = async (token) => {
    return await conn.runSQL(
      "INSERT INTO connect_4_registration_tokens (token) VALUES (?) ",
      [token]
    );
  };

  this.doesTokenExist = async (token) => {
    return await conn.runSQL(
      "SELECT * FROM connect_4_registration_tokens WHERE token = ? ",
      [token]
    );
  };

  this.deleteToken = async (token) => {
    return await conn.runSQL(
      "DELETE FROM connect_4_registration_tokens WHERE token = ? ",
      [token]
    );
  };

  // USER
  this.getUser = async (username) => {
    return await conn.runSQL(
      "SELECT username, inLobby FROM connect_4_user WHERE username = ? ",
      [username]
    );
  };

  this.getUsersInLobby = async () => {
    return await conn.runSQL(
      "SELECT username FROM connect_4_user WHERE inLobby = true",
      []
    );
  };

  this.getPassword = async (username) => {
    return await conn.runSQL(
      "SELECT password FROM connect_4_user WHERE username = ? ",
      [username]
    );
  };

  this.createUser = async (username, password, inLobby) => {
    return await conn.runSQL(
      "INSERT INTO connect_4_user (username, password, inLobby) VALUES (?, ?, ?) ",
      [username, password, inLobby]
    );
  };

  this.changeInLobbyStatus = async (newInLobbyStatus, username) => {
    return await conn.runSQL(
      "UPDATE connect_4_user SET inLobby = ? WHERE username = ?",
      [newInLobbyStatus, username]
    );
  };

  // LOBBY
  this.getLobbyMessages = async () => {
    await conn.runSQL("DELETE FROM connect_4_lobby_message WHERE timestamp < (NOW() - INTERVAL 10 MINUTE)", [])
    return await conn.runSQL("SELECT * FROM connect_4_lobby_message", []);
  };

  this.sendLobbyMessage = async (username, message) => {
    return await conn.runSQL(
      "INSERT INTO connect_4_lobby_message (user, message) VALUES ( ?, ? ) ",
      [username, message]
    );
  };

  this.sendGameRequest = async (senderUsername, receiverUsername) => {
    return await conn.runSQL(
      "INSERT INTO connect_4_connection_request (userCreated, userRequested) VALUES ( ?, ? ) ",
      [senderUsername, receiverUsername]
    );
  };

  this.deleteGameRequest = async (senderUsername, receiverUsername) => {
    return await conn.runSQL(
      "DELETE FROM connect_4_connection_request WHERE userCreated = ? AND userRequested = ? ",
      [senderUsername, receiverUsername]
    );
  };

  // GAME
  this.getGame = async (gameId) => {
    return await conn.runSQL(
      "SELECT * FROM connect_4_current_games WHERE gameId = ? ",
      [gameId]
    );
  };

  this.createGame = async (
    playerPink,
    playerYellow,
    turn,
    winner,
    gameboard
  ) => {
    return await conn.runSQL(
      "INSERT INTO connect_4_current_games (playerPink, playerYellow, turn, winner, gameboard ) VALUES ( ?, ?, ?, ?, ? ) ",
      [
        playerPink,
        playerYellow,
        turn,
        winner,
        gameboard
      ]
    );
  };

  this.takeTurn = async (gameId, turn, gameboard) => {
    return await conn.runSQL(
      "UPDATE connect_4_current_games SET turn = ?, gameboard = ? WHERE gameId = ? ",
      [turn, gameboard, gameId]
    );
  };

  this.setWinner = async (gameId, playerCode, gameboard) => {
    return await conn.runSQL(
      "UPDATE connect_4_current_games SET winner = ? , gameboard = ? WHERE gameId = ? ",
      [playerCode, gameboard, gameId]
    );
  };

  this.sendGameMessage = async (username, gameId, message) => {
    return await conn.runSQL(
      "INSERT INTO connect_4_game_message (user, gameId, message) VALUES ( ?, ?, ? ) ",
      [username, gameId, message]
    );
  };

  this.getGameMessages = async (gameId) => {
    return await conn.runSQL("SELECT * FROM connect_4_game_message WHERE gameId = ? ", [gameId]);
  };

  this.deleteGameMessages = async (gameId) => {
    return await conn.runSQL("DELETE FROM connect_4_game_message WHERE gameId = ? ", [gameId]);
  };
  this.deleteGame = async (gameId) => {
    return await conn.runSQL("DELETE FROM connect_4_current_games WHERE gameId = ? ", [gameId]);
  };
};