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

module.exports = {
  getLobbyMessages,
};
