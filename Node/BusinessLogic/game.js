/*
    Maija Philip
    Connect 4
*/

function move(x,y) {
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

function something(x,y) {}

module.exports = { move, something };