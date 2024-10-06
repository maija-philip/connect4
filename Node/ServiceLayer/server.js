/*
    Maija Philip
    Connect 4
*/

// set up express.js
const express = require('express');
const app = express();
app.use(express.static('public'));

app.get('/', (request, response) => {
    response.json({ message: "Hello!" })
});

// add the routes
let userRouter = require("./routes/user.js");
let lobbyRouter = require("./routes/lobby.js");
let gameRouter = require("./routes/game.js");

// use the routes
app.use("/user", userRouter);
app.use("/lobby", lobbyRouter);
app.use("/game", gameRouter);

app.listen(8282);
console.log("Express started on port 8282");