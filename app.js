//import dotenv package and configure it
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//imports routes to app.js from authRouter in routes folder
const authRouter = require("./routes/authRouter");

// /importing movieRouter manually. This is the middleware for movieRouter in routes folder
const movieRouter = require("./routes/movieRouter");

// /importing bookmarkRouter manually. This is the middleware for bookmarkRouter in routes folder
const bookmarkRouter = require("./routes/bookmarkRouter");

//import the error file from middleware folder
const error = require("./middlewares/error");

//this spins up a new express application
const app = express();

//this is for creating the port
const port = 4000;

// =======importing cors -- middlewares===========
app.use(cors());

//middleware that allows access to the request.body on all requests (without this you cant test on postman)
//use this to connect postman to app.js
app.use(express.json());

//middleware for login and register for authenticaton router
app.use("/api/auth", authRouter);

//middleware for movie router
app.use("/api/movie", movieRouter);

//middleware for bookmark router
app.use("/api/bookmark", bookmarkRouter);

//custome middleware for errors
app.use(error);

//start listening on a given port
//how to handle errors using TRYCATCH
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected");

    //Copy this
    await app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
    console.log("Unable to Connect");
  }
};

start();

//username - bolarinwaadefemi51
//password - BvoOt0u1Yx4BCq43
//connection string - mongodb+srv://bolarinwaadefemi51:BvoOt0u1Yx4BCq43@cluster0.qqstr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
