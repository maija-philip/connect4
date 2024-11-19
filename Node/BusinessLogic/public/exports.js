/*
    Maija Philip
    Connect 4
*/

const { move, getGameFromDB } = require("../game.js");
const { getLobbyMessages, storeMessage } = require("../chat.js");
const {
  getUserFromUsername,
  login,
  setUpNewUser,
  requestNewUserToken,
  logoutUser,
  getUsersInLobby,
} = require("../login.js");
const { acceptGameRequest } = require("../lobby.js");

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

  // Game

  this.validateMove = (column) => {
    return move(column);
  };

  this.getGame = async (gameId) => {
    return await getGameFromDB(gameId);
  };
};
