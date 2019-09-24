// import dependecies
const express = require("express");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Connect to mongoDB server
mongoose.connect("mongodb://localhost/todoApp");
mongoose.set("debug", true);

// Require the models
require("./server/models/Task");
require("./server/models/Todo");

// Init express
const app = express();

// Enable bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// Get environment port or use 3000
const port = process.env.PORT || "3000";
app.set("port", port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on port
server.listen(port, () => console.log(`API running on localhost:${port}`));

// Get our API routes
const api = require("./server/api/");
//Set API routes
app.use("/api", api);
