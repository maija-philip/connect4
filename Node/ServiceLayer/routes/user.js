/*
    Maija Philip
    Connect 4
*/

let express = require("express");
let router = express.Router();

// GET /user?username=”username”
router.get("/", async function (req, res) {

    // 200 { username: “username”, inLobby: true }
    // 404 { error: “this user does not exist” }
    // 400 { error: “Please enter a username”}

    res.json({message: "user"}); 
});

// POST user/verfiyUser
router.post("/verifyUser", async function (req, res) {

    // Content-Type: application/x-www-form-urlencoded
        // Payload: username, password
    // 200 { message: “logged in” }
    // 400 { message: “username or password is incorrect”}

    res.json({message: "verify user"}); 
});

// POST user/createNewUser
router.post("/createNewUser", async function (req, res) {

    // Content-Type: application/x-www-form-urlencoded
        // Payload: username, password
    // 201 { message: “welcome” }
	// 400 { error: “please review the information and try again”}

    res.json({message: "create new user"}); 
});


module.exports = router;