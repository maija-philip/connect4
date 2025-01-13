# Connect 4
Maija Philip
For ISTE 442: Secure Web Application Development I

# Documentation
Check out the documentation folder to see all the documentation or see the [Proposal Here](https://github.com/maija-philip/connect4/blob/main/Documentation/Connect%204%20Proposal%20-%20Maija%20Philip.pdf)

## How to run
This is hosted on https://connect4.maija.xyz/

To run locally:
Start the express server with `cd ./Node/ServiceLayer node server.js`
Start the react website with `cd ./connect-4-front-end npm start`

# Retrospective 
This is a project that I heard about since freshman year, and frankly I was scared. This project was a lot of work and a lot of challenge. It was my first time creating a whole complete web server application. I created a mySQL Database on Google Cloud, Node.js server hosted on Google Cloud Run, as well as a front end with React.js, hosted with Google Cloud Storage Buckets and CloudFlare on my personal domain. 

The database was the easiest part of this project, I created the ERD and mySQL statements quickly, but did struggle and spend a while to figure out how to setup the Google Cloud Database. Once it was setup, however, it was smooth sailing.

The server and the frontend I was working on for the whole course of the project, back and forth. The hosting of the front end was much more straightforward than the server because I have had experience in that. After I got the server setup it, also, was pretty smooth sailing. I did have some trouble with the request limit, but I didn't have enough time to fully debug that, wether it was from the way I had the server or db set up, or the way I wrote the server.

The most challenging aspect of this was definitely setting up the environment with Google, and getting that to work as I want to. After that was figuring out what information the server needs for each call and how to keep a secure web server, but also allow it to be called by my front end. This included setting up some specific things in express.js

I also created my own token function using the ip address, browser, and datetime. In addition this was my first time using web sockets in a project and draggging and dropping svgs in React.js. This was a really fun and challenging project, especially given the timeframe of about 3 months to do this alongside our other classes and classwork in this particular class. I would reccommend anyone interested in websites and servers to do a project like this to put all their skills together. 
\
\
**Skills I added:** Express.js, Google Cloud Run, Google Cloud mySQL DB, Draggable SVGs React.js
