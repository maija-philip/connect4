/*
    Maija Philip
    Connect 4
*/


let express = require("express");
let router = express.Router();

// GET /game/{gameId}
router.get("/{gameId}/", async function (req, res) {

    // 200 {
    //         gameId: 123,
    //         playerPink: “username”,
    //         playerYellow: “username”,
    //         turn: 1 ,
    //         winner: 0,
    //         row0: 000000
    //         row1: 000000
    //         row2: 000000
    //         row3: 000000
    //         row4: 000000
    //         row5: 002000
    //         row6: 001210
    //     }
    // 404 { error: “game not found” }

    console.log(`Game Id: ${gameId}`);
    res.json({message: "game"});
});


// POST /game/{gameId}/getTurn
router.post("/{gameId}/getTurn", async function (req, res) {

    // Content-Type': 'application/json
	// 		{ token:  123 }
    // 200 { yourTurn: false }
    // 404 { error: “token invalid” }

    console.log(`Game Id: ${gameId}`);
    res.json({message: "get turn"}); 
});

// POST /game/{gameId}/takeTurn
router.post("/{gameId}/takeTurn", async function (req, res) {

    // Content-Type': 'application/json
	// 		{ token:  123, xMove: 0, yMove: 6 }
    // 200 { message: “Turn taken” }
    // 400 { error: “make sure you have a valid move” }	
    // 404 { error: “token invalid” }

    console.log(`Game Id: ${gameId}`);
    res.json({message: "take turn"}); 
});

// POST /game/{gameId}/forfeit
router.post("/{gameId}/forfeit", async function (req, res) {

    // Content-Type': 'application/json
    //     { token:  123 }
    // 200 { message: “Game ended, your opponent won” }
    // 404 { error: “token invalid” }

    console.log(`Game Id: ${gameId}`);
    res.json({message: "forfeit"}); 
});


// POST /game/{gameId}/sendMessage
router.post("/{gameId}/sendMessage", async function (req, res) {

    // Content-Type': 'application/json
	// 		{ message: “message”, token: 123 }
    // 200 { message: “message sent” }
    // 404 { error: “token invalid” }
    // 500 { error: “something went wrong, please try again” }

    console.log(`Game Id: ${gameId}`);
    res.json({message: "send message"}); 
});


module.exports = router;