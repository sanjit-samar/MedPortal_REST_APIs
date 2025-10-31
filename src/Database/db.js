const mongoose = require("mongoose");
require("dotenv").config();

DB_URI=process.env.DB_URL

async function dbConnection(){
    try{
        await mongoose.connect(DB_URI);
        console.log("DB connected...")
    }catch(error){
        console.error(error, "Db Connection Fails...")
    }
}

module.exports = dbConnection;