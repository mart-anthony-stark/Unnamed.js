const unnamed = require("../src");
const mongoose = require("mongoose");
const cors = require("cors");

// env variables
require("dotenv").config({});

const server = unnamed({
  port: process.env.PORT || 5000,
  init: async () => {
    try {
      mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to database");
    } catch (error) {
      console.log(error);
    }
  },
});

server.middleware(cors("*"));
server.GET("/", (req, res) => {
  res.send("hello");
});
