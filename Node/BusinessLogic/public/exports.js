/*
    Maija Philip
    Connect 4
*/

const { getGameFromDB, getGameMessages, forfeit, deleteGame, sendMessageInGameChat } = require("../game.js");
const { getLobbyMessages, storeMessage } = require("../chat.js");
const {
  getUserFromUsername,
  login,
  setUpNewUser,
  requestNewUserToken,
  logoutUser,
  getUsersInLobby,
  addPlayerToLobby,
} = require("../login.js");
const { acceptGameRequest } = require("../lobby.js");
const { move } = require("../moves.js");

// export to api request
module.exports = function () {
  // User

  this.getUser = async (username) => {
    return await getUserFromUsername(username);
  };
  this.getLobbyUsers = async () => {
    return await getUsersInLobby()
  };
  this.validateLogin = async (username, password) => {
    return await login(username, password);
  };
  this.validateNewUserInfo = async (ip, browser, token, username, password) => {
    return await setUpNewUser(ip, browser, token, username, password);
  };
  this.getNewUserToken = async (ip, browser) => {
    return await requestNewUserToken(ip, browser);
  };
  this.logout = async (username) => {
    return await logoutUser(username)
  };

  // Chat
  this.getAllLobbyMessages = async () => {
    return await getLobbyMessages();
  };

  this.sendMessage = async (username, message) => {
    return await storeMessage(username, message)
  };

  // Lobby
  this.acceptGameRequest = async (sender, receiver) => {
    return await acceptGameRequest(sender, receiver)
  };
  this.putPlayerInLobby = async (username) => {
    return await addPlayerToLobby(username)
  }

  // Game
  this.validateMove = (username, gameId, column) => {
    return move(username, gameId, column);
  };

  this.getGame = async (gameId) => {
    return await getGameFromDB(gameId);
  };

  this.sendGameMessage = async (username, message, gameId) => {
    return await sendMessageInGameChat(username, message, gameId)
  }

  this.getAllGameMessages = async (gameId) => {
    return await getGameMessages(gameId)
  }

  this.forfeitGame = async (username, gameId) => {
    return await forfeit(username, gameId)
  }

  this.deleteGameWithId = async (username, gameId) => {
    return await deleteGame(username, gameId)
  }
};
