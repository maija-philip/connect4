/*
    Maija Philip
    Connect 4
*/

const Error = require("./public/errors.js");
const error = new Error();

const Database = require("./../DataAccess/queries.js");
const db = new Database();

async function getLobbyMessages() {}

module.exports = {
    getLobbyMessages
};
