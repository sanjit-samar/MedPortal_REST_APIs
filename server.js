const express = require("express");
const dbConnection = require("./src/Database/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// connect to DB
dbConnection();

//Middleware
app.use(express.json());

app.listen(PORT, ()=>{
    console.log("Server.js is running...")
})