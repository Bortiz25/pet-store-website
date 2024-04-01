# Parrots and Ferrrets Website
## Setup 
### Dependencies
Setting Up dependencies is a simple one word command.
```
cd pet_website_app
npm intall
```
Just call this command from the project directory and all dependencies should be
downloaded. 

### Running Server 
In order to build the local environment and run the server. Also from the `pet_website_app` directory. 
```
npm start
```
Call **npm start** and the server builds automatically.
```
> pet-website-app@0.0.0 start
> node ./bin/www

successfully connected to mongoDB
```
If this message above does appear in your terminal you are doing something wrong 👎🏽.

## MongoDB
# Database Management 

After recieveing an invitation with access to the database, navigate to view all database deployments. Click on the "Cluster0" hyperlink then click on the collections tab. The database is named "Website" and it contains two collections.

# Products collection schema

{ 
"_id": objectId,
"productName": String,
"price": Double,
"tags": Array,
"category": String
"img": String,
description: String,
timeStamp: Timestamp
}

The "product" collection stores product documents in JSON format. Each product document has a unique object ID. The "productTag" field is an array of strings used for filtering products and "img" is a link to the product image. The "category" field for a product is either "Bird" or "Ferret". Products for both animals have "Both" as their category value. "timestamp" is a timestamp object.

# Users collection schema
{ "_id": ObjectID,"Fname": String,
“LName": String,
"Email": String,
"Addy": String,
"State": String,
"Country": String,
"username": String,
"password": String,
"isAdmin": boolean

"Cart": [
{
"id_": ObjectId,
"quantity": Integer,
"isSubscription":boolean, 
"subscriptionTime":String
}]
}

The required fields are "Fname", "Lname", "username", and "password". The "isAdmin" field has a boolean value to identify admin users.

# database.js 

The database file contains code to connect our Node.js application to MongoDB.

```
const mongoose = require("mongoose"); 
```
we use mongoose, an Object Data Modeling Library, to query data in our database. 

```
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
```
  We use await to ensure that the application waits for the connection to be fully established. 


## Development
### Pages and Routes
Pages are made in the `views/pages/` directory and will be made as `.ejs` files. 
These files are called from `.js` files called in the `routes/` directory. 
```
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Title' });
});

module.exports = router;
```
Example of a `index.js` file that is rendering the index page using the routes.