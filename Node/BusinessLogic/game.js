/*
    Maija Philip
    Connect 4
*/

// export to api request
module.exports = function () {
    
    // make sure the move is within the board and rules
    this.validateMove = (x, y) => {
        // check if it's within the board
        // 7 across
        // 6 down 
        if (x > 6 || y > 5) {
            return {valid: false}
        }
        // check if it's empty
        // check if it should fall
        return {valid: true, x: 0, y: 0};
    };

}