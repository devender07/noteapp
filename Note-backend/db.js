const mongoose = require('mongoose');
require('dotenv').config()
const URI = process.env.MONGODB_URI;

const DB = async()=>{
    try {
        await mongoose.connect(URI)
        console.log("DB Connection Successfull");
    } catch (error) {
        console.log("DB Connection Error");
    }
};


module.exports = DB
