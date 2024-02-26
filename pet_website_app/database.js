require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(uri);
        console.log("successfully connected to mongoDB")

    }
    catch (error) {
        console.log("error connecting to mongoDB", error.message);
    }
}

module.exports = connectDb;