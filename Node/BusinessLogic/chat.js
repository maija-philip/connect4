/*
    Maija Philip
    Connect 4
*/

const Error = require("./public/errors.js");
const error = new Error();

const Database = require("./../DataAccess/queries.js");
const db = new Database();

async function getLobbyMessages() {
  const result = await db.getLobbyMessages();

  return result;
}

async function storeMessage(username, message) {
  if (message.length > 200) {
    return error.messageTooLong
  }

  const result = await db.sendLobbyMessage(username, message)
  if (result.length < 1) {
    return error.somethingWentWrong
  }

  return error.noError
}

module.exports = {
  getLobbyMessages,
  storeMessage,
};
