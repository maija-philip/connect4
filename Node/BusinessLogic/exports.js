/*
    Maija Philip
    Connect 4
*/

const { move } = require("./game.js");
const {
  getUserFromUsername,
  login,
  setUpNewUser,
  requestNewUserToken,
} = require("./login.js");

// export to api request
module.exports = function () {
  // User

  this.getUser = async (username) => {
    return await getUserFromUsername(username);
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

  // Game

  this.validateMove = (x, y) => {
    return move(x, y);
  };
};
