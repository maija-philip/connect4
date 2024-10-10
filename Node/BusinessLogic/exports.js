/*
    Maija Philip
    Connect 4
*/

const { move } = require("./game.js");

// export to api request
module.exports = function () {
    
    // make sure the move is within the board and rules
    this.validateMove = (x, y) => { return move(x, y) };


    
}