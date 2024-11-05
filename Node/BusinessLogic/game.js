/*
    Maija Philip
    Connect 4
*/

const Error = require("./public/errors.js");
const error = new Error();

const Database = require("./../DataAccess/queries.js");
const db = new Database();

const PLAYER_PINK = 1, PLAYER_YELLOW = 2, NO_PLAYER = 0

async function createNewGame(sender, receiver) {

    const startingGameboard = [
        new Array(7).fill(NO_PLAYER),
        new Array(7).fill(NO_PLAYER),
        new Array(7).fill(NO_PLAYER),
        new Array(7).fill(NO_PLAYER),
        new Array(7).fill(NO_PLAYER),
        new Array(7).fill(NO_PLAYER),
    ]

    const result = db.createNewGame( sender,
        receiver,
        PLAYER_PINK,
        NO_PLAYER,
        { board: startingGameboard })
}

async function move(x,y) {
    // check if it's within the board
    // 7 across
    // 6 down 
    if (x > 6 || y > 5) {
        return {valid: false}
    }
    // check if it's empty
    // check if it should fall
    return {valid: true, x: 0, y: 0};
}

module.exports = { move, createNewGame };