// import dependecies
const express = require("express");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// Require the models
require("./server/models/Task");
require("./server/models/Todo");

// Connect to mongoDB server
mongoose.connect("mongodb://localhost/todoApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set("debug", true);
mongoose.set("useCreateIndex", true);

// Init express
const app = express();

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

// Enable bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Get our API routes
const api = require("./server/api/");
//Set API routes
app.use("/api", api);

//Static path to dist
app.use(express.static(path.join(__dirname, "todo-app/dist/todo-app")));

//Catch all other routes and return to the index file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "todo-app/dist/todo-app/index.html"));
});

// Get environment port or use 3000
const port = process.env.PORT || "3000";
app.set("port", port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on port
server.listen(port, () => console.log(`API running on localhost:${port}`));
