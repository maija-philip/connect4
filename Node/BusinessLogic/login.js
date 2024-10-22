/*
    Maija Philip
    Connect 4
*/

const Error = require("./errors.js");
const error = new Error();

const Database = require("./../DataAccess/queries.js");
const db = new Database();

const bcrypt = require("bcryptjs");

// Using provided username, get if the user is in the lobby or not 
async function getUserFromUsername(username) {
    const result = await db.getUser(username);
    if (result.length == 0 || result[0].inLobby == 0) {
        return error.noUserInLobby;
    }
    return error.noError;
}

// verify the login information 
async function login(username, password) {
    if (username.length > 60 || password > 60) {
        return error.invalidLogin;
    }
    const result = await db.getPassword(username);
    if (result.length == 0) {
        return error.invalidLogin;
    }

    const match = await bcrypt.compare(password, result[0].password);
    console.log('match? ', match);
    if (!match) {
        return error.invalidLogin;
    }
    return error.noError;
}

// hash with bcrypt
//const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds of salt

module.exports = { getUserFromUsername, login };