/*
    Maija Philip
    Connect 4
*/

const Connection = require("./connection.js");
const conn = new Connection();

// export to api request
module.exports = function () {
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

  this.getToken = async (username) => {
    return await conn.runSQL("SELECT token FROM connect_4_user WHERE username = ? ", [
      username,
    ]);
  };

  this.getUserWithToken = async (token) => {
    return await conn.runSQL("SELECT username FROM connect_4_user WHERE token = ? ", [
      token,
    ]);
  };

  this.createUser = async (username, password, inLobby, token) => {
    return await conn.runSQL(
      "INSERT INTO connect_4_user (username, password, inLobby, token) VALUES (?, ?, ?, ?) ",
      [username, password, inLobby, token]
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
    return await conn.runSQL("SELECT * FROM connect_4_lobby_message", []);
  };

  this.sendLobbyMessage = async (username, message) => {
    return await conn.runSQL(
      "INSERT INTO connect_4_lobby_message (user, message) VALUES ( ?, ? ) ",
      [username, message]
    );
  };

  this.sendGameRequest = async (senderUsername, recieverUsername) => {
    return await conn.runSQL(
      "INSERT INTO connect_4_connection_request (userCreated, userRequested) VALUES ( ?, ? ) ",
      [senderUsername, recieverUsername]
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
    row0,
    row1,
    row2,
    row3,
    row4,
    row5,
    row6
  ) => {
    return await conn.runSQL(
      "INSERT INTO connect_4_current_games (playerPink, playerYellow, turn, winner, row0, row1, row2, row3, row4, row5, row6 ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) ",
      [
        playerPink,
        playerYellow,
        turn,
        winner,
        row0,
        row1,
        row2,
        row3,
        row4,
        row5,
        row6,
      ]
    );
  };

  this.takeTurn = async (gameId, turn, row0, row1, row2, row3, row4, row5, row6) => {
    return await conn.runSQL(
      "UPDATE connect_4_current_games SET turn = ?, row0 = ?, row1 = ?, row2 = ?, row3 = ?, row4 = ?, row5 = ?, row6 = ? WHERE gameId = ? ",
      [turn, row0, row1, row2, row3, row4, row5, row6, gameId]
    );
  };

  this.setWinner = async (usernameCode, gameId) => {
    return await conn.runSQL(
      "UPDATE connect_4_current_games SET winner = ? WHERE gameId = ? ",
      [usernameCode, gameId]
    );
  };

  this.sendGameMessage = async (username, message) => {
    return await conn.runSQL(
      "INSERT INTO connect_4_game_message (user, gameId, message) VALUES ( ?, ?, ? ) ",
      [username, gameId, message]
    );
  };

  this.getGameMessages = async (gameId) => {
    return await conn.runSQL("SELECT * FROM connect_4_game_message WHERE gameId = ? ", [gameId]);
  };
};
