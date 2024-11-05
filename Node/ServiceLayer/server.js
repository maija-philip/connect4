/*
    Maija Philip
    Connect 4
*/

// set up express.js
const express = require("express");
const session = require("express-session");
const socket = require("express-ws")
const cookieParser = require("cookie-parser");
const cors = require('cors');

const { MIN_30 } = require("../constants.js");

const app = express();
const expressWs = require('express-ws')(app);

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());

app.use(cors({
  origin: true,
  credentials: true,
}));
app.enable('trust proxy')


app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: MIN_30 }, // secure: true, httpOnly: true, secure: true, , sameSite: 'none'
  })
);

app.set("trust proxy", true);

app.get("/", (request, response) => {
  response.json({ message: "Hello!" });
});

// add the routes
let userRouter = require("./routes/user.js");
let lobbyRouter = require("./routes/lobby.js");
let gameRouter = require("./routes/game.js");
let sessionRouter = require("./routes/session.js");
let lobbySocketRouter = require("./routes/lobbySocket.js");

// use the routes
app.use("/user", userRouter);
app.use("/lobby", lobbyRouter);
app.use("/game", gameRouter);
app.use("/session", sessionRouter);
app.use("/lobby-socket", lobbySocketRouter)

app.listen(8080);
console.log("Express started on port 8080");
