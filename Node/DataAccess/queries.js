/*
    Maija Philip
    Connect 4
*/

const Connection = require("./connection.js");
const conn = new Connection();

// export to api request
module.exports = function () {
  // USER
  this.getUser = (username) => {
    return conn.runSQL(
      "SELECT username, inLobby FROM connect_4_user WHERE username = ? ",
      [username]
    );
  };

  this.getUsersInLobby = () => {
    return conn.runSQL(
      "SELECT username FROM connect_4_user WHERE inLobby = true",
      []
    );
  };

  this.getPassword = (username) => {
    return conn.runSQL(
      "SELECT password FROM connect_4_user WHERE username = ? ",
      [username]
    );
  };

  this.getToken = (username) => {
    return conn.runSQL("SELECT token FROM connect_4_user WHERE username = ? ", [
      username,
    ]);
  };

  this.getUserWithToken = (token) => {
    return conn.runSQL("SELECT username FROM connect_4_user WHERE token = ? ", [
      token,
    ]);
  };

  this.createUser = (username, password, inLobby, token) => {
    return conn.runSQL(
      "INSERT INTO connect_4_user (username, password, inLobby, token) VALUES (?, ?, ?, ?) ",
      [username, password, inLobby, token]
    );
  };

  this.changeInLobbyStatus = (newInLobbyStatus, username) => {
    return conn.runSQL(
      "UPDATE connect_4_user SET inLobby = ? WHERE username = ?",
      [newInLobbyStatus, username]
    );
  };

  // LOBBY
  this.getLobbyMessages = () => {
    return conn.runSQL("SELECT * FROM connect_4_lobby_message", []);
  };

  this.sendLobbyMessage = (username, message) => {
    return conn.runSQL(
      "INSERT INTO connect_4_lobby_message (user, message) VALUES ( ?, ? ) ",
      [username, message]
    );
  };

  this.sendGameRequest = (senderUsername, recieverUsername) => {
    return conn.runSQL(
      "INSERT INTO connect_4_connection_request (userCreated, userRequested) VALUES ( ?, ? ) ",
      [senderUsername, recieverUsername]
    );
  };

  // GAME
  this.getGame = (gameId) => {
    return conn.runSQL(
      "SELECT * FROM connect_4_current_games WHERE gameId = ? ",
      [gameId]
    );
  };

  this.createGame = (
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
    return conn.runSQL(
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

  this.takeTurn = (gameId, turn, row0, row1, row2, row3, row4, row5, row6) => {
    return conn.runSQL(
      "UPDATE connect_4_current_games SET turn = ?, row0 = ?, row1 = ?, row2 = ?, row3 = ?, row4 = ?, row5 = ?, row6 = ? WHERE gameId = ? ",
      [turn, row0, row1, row2, row3, row4, row5, row6, gameId]
    );
  };

  this.setWinner = (usernameCode, gameId) => {
    return conn.runSQL(
      "UPDATE connect_4_current_games SET winner = ? WHERE gameId = ? ",
      [usernameCode, gameId]
    );
  };

  this.sendGameMessage = (username, message) => {
    return conn.runSQL(
      "INSERT INTO connect_4_game_message (user, gameId, message) VALUES ( ?, ?, ? ) ",
      [username, gameId, message]
    );
  };

  this.getGameMessages = (gameId) => {
    return conn.runSQL("SELECT * FROM connect_4_game_message WHERE gameId = ? ", [gameId]);
  };
};
