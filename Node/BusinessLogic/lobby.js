/*
    Maija Philip
    Connect 4
*/

const Error = require("./public/errors.js");
const error = new Error();

const Database = require("./../DataAccess/queries.js");
const { createNewGame } = require("./game.js");
const db = new Database();

async function sendGameRequest(sender, receiver) {

    // verify receiver username exists
    const result = await db.getUser(receiver)
    console.log(result)

    if (receiver.length > 60 || result.length < 1 || result[0].inLobby == false) {
        return error.usernameDNE
    }

    // send request
    result = await db.sendGameRequest(sender, receiver)
    if (result.length < 1) {
        return error.somethingWentWrong
    }
    return error.noError
}

async function acceptGameRequest(sender, receiver) {
    
    // verify receiver username exists
    const result = await db.getUser(receiver)
    console.log(result)

    if (receiver.length > 60 || result.length < 1 || result[0].inLobby == false) {
        return error.usernameDNE
    }

    // delete game request
    await db.deleteGameRequest(sender, receiver)
    return await createNewGame(sender, receiver)
}


module.exports = {
    sendGameRequest,
    acceptGameRequest
};
