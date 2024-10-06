/*
    Maija Philip
    Connect 4
*/

let express = require("express");
let router = express.Router();

// GET /lobby
router.get("/", async function (req, res) {

    // 200 [
    //         {
    //         messageId: 123456,
    //         timestamp: “2024-10-01 09:39:11”,
    //         user: “username”,
    //         message: “message”
    //         }
    //         … // returns all current lobby messages
    //     ]
    // 500 { error: “something went wrong, please try again” }

    res.json({message: "lobby"});
    
});


// POST /lobby/sendMessage
router.post("/sendMessage", async function (req, res) {

    // Content-Type': 'application/json
    //     { message: “message”, token: 123 }
    // 200 { message: “message sent” }
    // 404 { error: “token invalid” }
    // 500 { error: “something went wrong, please try again” }

    res.json({message: "send message"}); 
});

// POST /lobby/sendGameRequest
router.post("/sendGameRequest", async function (req, res) {

    // Content-Type': 'application/json
    //     { username: "username", token: 123 }
    // 200 { message: “request sent” }
	// 400 { error:“make sure both usernames exist and are in the lobby”}
	// 500 { error: “something went wrong, please try again” }


    res.json({message: "send game request"}); 
});

module.exports = router;
