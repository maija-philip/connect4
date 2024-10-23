/*
    Maija Philip
    Connect 4
*/

// set up express.js
const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded())
app.set('trust proxy', true)

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

app.listen(8080);
console.log("Express started on port 8080");