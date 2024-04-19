const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongo = undefined;

const connectMongoMemory = async () => {
    try {
        mongo = await MongoMemoryServer.create();
        const url = mongo.getUri();
        await mongoose.connect(url);
        console.log("Successfully connected mongoose memory server");
    } catch {
        console.log("Failed to connect mongoose memory server");
    }

};

const closeDatabase = async () => {
    if(mongo) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongo.stop;
        
    }
}

const dropCollections = async () => {
    if (mongo) {
        const collections = mongoose.connection.collections;

        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany();
        }
    }
};

module.exports = {connectMongoMemory, closeDatabase, dropCollections};