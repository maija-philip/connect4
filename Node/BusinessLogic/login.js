/*
    Maija Philip
    Connect 4
*/

const Error = require("./public/errors.js");
const error = new Error();

const Database = require("./../DataAccess/queries.js");
const db = new Database();

const bcrypt = require("bcryptjs");

const Token = require("./token.js");
const tokenMachine = new Token();

// Using provided username, get if the user is in the lobby or not
async function getUserFromUsername(username) {
  const result = await db.getUser(username);

  if (result.length == 0 || result[0].inLobby == 0) {
    return error.noUserInLobby;
  }
  return error.noError;
}

// Using provided username, get if the user is in the lobby or not
async function getUsersInLobby() {
  const result = await db.getUsersInLobby();
  console.log(result)
  return result;
}

// verify the login information
async function login(username, password) {
  if (username.length > 60 || password > 60) {
    return error.invalidLogin;
  }

  let result = await db.getPassword(username);
  if (result.length == 0) {
    return error.invalidLogin;
  }

  const match = await bcrypt.compare(password, result[0].password);
  if (!match) {
    return error.invalidLogin;
  }

  result = await db.changeInLobbyStatus(true, username);
  if (result.length == 0 ){
    return error.somethingWentWrong
  }

  return error.noError;
}

// create new user + hash their password
async function setUpNewUser(ip, browser, token, username, password) {
  if (username.length > 60 || username.length < 4 || password.length > 60 || password.length < 4 || token.length > 100 || token.length < 4) {
    return error.invalidNewUserInformation;
  }

  // does the token exist?
  let result = await db.doesTokenExist(token);
  let isTokenValid = tokenMachine.validateToken(ip, browser, token);

  db.deleteToken(token);
  if (result.length < 1 || !isTokenValid) {
    return error.invalidToken;
  }

  // does this username exist already?
  result = await db.getUser(username);

  if (result.length > 0) {
    return error.invalidNewUserInformation;
  }

  const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds of salt
  result = await db.createUser(username, hashedPassword, true);
  if (result.affectedRows < 1) {
    return error.somethingWentWrong;
  }

  return error.noError;
}

// create new user + hash their password
async function requestNewUserToken(ip, browser) {
  let token = tokenMachine.createToken(ip, browser);

  let result = db.saveToken(token);
  if (result.affectedRows < 1) {
    return {error: error.somethingWentWrong}
  }

  return { token: token, error: error.noError };
}


// create new user + hash their password
async function logoutUser(username) {
  
  let result = db.changeInLobbyStatus(false, username);
  if (result.affectedRows < 1) {
    return error.somethingWentWrong
  }

  return error.noError ;
}


module.exports = {
  getUserFromUsername,
  getUsersInLobby,
  login,
  setUpNewUser,
  requestNewUserToken,
  logoutUser
};
