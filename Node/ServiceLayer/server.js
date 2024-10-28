/*
    Maija Philip
    Connect 4
*/

// set up express.js
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { MIN_30 } = require("../constants.js");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());

app.set("trust proxy", 1);
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: MIN_30 },
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

app.listen(8080);
console.log("Express started on port 8080");
