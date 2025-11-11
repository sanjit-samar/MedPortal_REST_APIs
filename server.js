const express = require("express");
const dbConnection = require("./Src/Database/db");
const authroutes = require('./Src/Routes/authroutes');
const welcomeroutes = require('./Src/Routes/welcomeroutes');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// connect to DB
dbConnection();

//Middleware
app.use(express.json());

//Register all routes here 
app.use('/api/auth', authroutes);
app.use('/api/login', welcomeroutes);

app.listen(PORT, ()=>{
    console.log("Server.js is running...")
})