/*
    Maija Philip
    Connect 4
*/

const { move } = require("./game.js");
const { getUserFromUsername, login, setUpNewUser } = require("./login.js");

// export to api request
module.exports = function () {

    // User

    this.getUser = async (ip, username) => { return await getUserFromUsername(ip, username); }
    this.validateLogin = async (ip, username, password) => { return await login(ip, username, password); }
    this.validateNewUserInfo = async (ip, username, password) => { return await setUpNewUser(ip, username, password); }
    
    // Game

    this.validateMove = (x, y) => { return move(x, y) };
}