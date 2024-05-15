//import express and routes
const express = require("express");
const mainRouter = require("./routes/index");
//import cors for frontend and backend working
const cors = require("cors");

const app = express();

//using the middlewares
app.use(cors());
app.use(express.json());

//defining the router for all routes
app.use("/api/v1", mainRouter);

//listening port
app.listen(3000);
