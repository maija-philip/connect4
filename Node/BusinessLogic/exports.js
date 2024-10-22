/*
    Maija Philip
    Connect 4
*/

const { move } = require("./game.js");
const { getUserFromUsername, login } = require("./login.js");

// export to api request
module.exports = function () {

    this.getUser = async (username) => { return await getUserFromUsername(username); }

    this.validateLogin = async (username, password) => { return await login(username, password); }
    
    // make sure the move is within the board and rules
    this.validateMove = (x, y) => { return move(x, y) };
}