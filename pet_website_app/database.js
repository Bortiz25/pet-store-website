require("dotenv").config();
const mongoose = require("mongoose");
// uri stored in .env file 
const uri = process.env.MONGO_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Successfully connected to mongoDB")

    }
    catch (error) {
        console.log("Error connecting to mongoDB: ", error.message);
    }
}

module.exports = connectDb;