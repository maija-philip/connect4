/*
    Maija Philip
    Connect 4
*/

/**
 * Set up Express Server
 */
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// var MemoryStore = session.MemoryStore;

const { MIN_30, HOUR_1 } = require("../constants.js");

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.enable("trust proxy");
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: { secure: true, maxAge: HOUR_1, sameSite: "none" }, // httpOnly: true
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

// use the routes
app.use("/user", userRouter);
app.use("/lobby", lobbyRouter);
app.use("/game", gameRouter);
app.use("/session", sessionRouter);

const server = app.listen(443);
console.log("Express started on port 443");

/**
 * Set Up Web Server
 */
const BusinessLogic = require("../BusinessLogic/public/exports.js");
const business = new BusinessLogic();

const Sanitizer = require("./..//BusinessLogic/sanitize.js");
const sanitizer = new Sanitizer();

var WebSocketServer = require("ws").Server;
var wss = new WebSocketServer({ server: server });

wss.on("connection", function (ws) {

  ws.on("message", function (message) {
    let sanitizedMessage = sanitizer.sanitize(message);
    let parsedMessage = JSON.parse(sanitizedMessage);

    // if the parsed message has a message component, store the message
    if (parsedMessage.message) {
      business.sendMessage(parsedMessage.user, parsedMessage.message);
    }

    // if the parsed message has a message component, store the message
    if (parsedMessage.gameMessage) {
      business.sendGameMessage(
        parsedMessage.user,
        parsedMessage.gameMessage,
        parsedMessage.gameId
      );
    }

    if (parsedMessage.connection) {
      business.putPlayerInLobby(parsedMessage.user)
    }

    wss.broadcast(message);
  });
});

wss.broadcast = function broadcast(msg) {
  wss.clients.forEach(function each(client) {
    client.send(msg.toString());
  });
};
