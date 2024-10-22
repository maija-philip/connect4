/*
    Maija Philip
    Connect 4
*/

const { move } = require("./game.js");
const { getUserFromUsername, login, setUpNewUser } = require("./login.js");

// export to api request
module.exports = function () {

    // User

    this.getUser = async (username) => { return await getUserFromUsername(username); }
    this.validateLogin = async (username, password) => { return await login(username, password); }
    this.validateNewUserInfo = async (username, password) => { return await setUpNewUser(username, password); }
    
    // Game

    this.validateMove = (x, y) => { return move(x, y) };
}