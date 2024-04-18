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
### Database Management

After recieveing an invitation with access to the database, navigate to view all database deployments. Click on the "Cluster0" hyperlink then click on the collections tab. The database is named "Website" and it contains two collections.


### Products collection schema

The "product" collection stores product documents in JSON format. Each product document has a unique object ID that is autimatically created each time you create a new document. The "productTag" field is an array of strings used for filtering products and "img" is a url to the product image. The "category" field for a product is either "Bird" or "Ferret". Products for both animals have "Both" as their category value. 
{
"_id": ObjectId,
"productName": String,
"price": Double,
"tags": Array,
"category": String
"img": String,
description: String,
timeStamp: String
}


### Users collection schema

The required fields are "Fname", "Lname", "username", and "password".

{ "_id": ObjectId,"fname": String,
“lName": String,
"email": String,
"addy": String,
"state": String,
"country": String,
"username": String,
"password": String,
"isAdmin": boolean

"Cart": [
{
"id_": ObjectId,
"productName" : String,
"quantity": Integer
}]
}


### Audit collection schema
{
"id_": ObjectId,
"productName": String,
"adminName": String,
"action": String
"timeStamp": String
}

The action field has the string value "Added product" or "Deleted product". The timestamp string is the javascript Date object stringifyed.


## database.js

The database file contains code to connect our Node.js application to MongoDB.

```
const mongoose = require("mongoose");
```
we use mongoose, an Object Data Modeling Library, to query data in our database.

The mongoose.connect() function has a uri string paramater. The uri string for our database is located in our '.env' file. 

## Controllers
The 'productController' and 'userController' javascript files are located in the `contollers/` directory.
### Product Controller

Once we import the Product model to this file, we use the mongoose.find() and mongose.exists() to query products.

The async function 'fetchProducts' has no paramaters and returns an array contaning 'Product' class instances.

```
const productList = await Product.find();
```
In the 'fetchProducts' function, we use mongoose.find() to retrieve a JSON array contanining all documents from MongoDB that match the sturcture defined by the Product model.

We iterate through the 'productList' array and convert each JSON object into instances of our javascript 'Product' class. 

The async 'addProduct' function accepts the name, price, tags, category, img, and description as parameters.

```
const prod = await Product.exists({productName: _name});
```
In the 'addProduct' function, we use mongoose.exists() to check if a product with the given name exists,returning a boolean result. If the product does not exist, we create a new product instance using the 'new' keyword and pass all fields from the parameter to the constructor. The timestamp field for the new product is set to a javascript 'Date' object.


```
const newProd = new Product({productName : _name, ...,
timeStamp: (new Date().toString())});
```

To save the product to our database, we use the mongoose.save() function. 

```
newProd.save();
```

The async `auditProducts' function is similiar to the 'fetchProduct' function. The only difference is that we use mongoose.find() on our 'Audit' model. The function returns an array of instances of our 'AuditClass'. 

```
const productList = await Audit.find();
```

The async 'addAudit' function accepts the name, admin name, and action paramaters. 

### User Controller
The async 'addUser' function accepts the fstName, lstName, email, address, country, state, username, and password parameters. Inside the function, we initialize an 'isAdmin' variable to false. The function is similar to 'addProducts' in the 'productsController' file. 

In the async 'findUser' function we use mongoose.find() to return an array of queried user documents.

```
const ret = await User.find({userName: username, password: pw});
const user = ret[0];
```

We then return an object of the form : 
``` 
{userInfo: user, pw: true};
```
If the userename and paswword combination was found we pw is set to true, otherwise it is false.

## Models  
The `models/` directory contains the product, user, and audit javascript files with their corresponding schemas. 

We use the mongoose.schema() function to create a 'new' object that contains the same fields and datatypes as our product collection in MongoDB. 

```
const productSchema = new mongoose.Schema({productName: String, ...,price: Number});
```
We then use the mongoose.model() function to create a model of the schema. 

The first argument of the 'model' function is the name of the schema you created. This argument refers to the capitalized, plural name of the 'products' collection name in our database.

The second argument is the variable containing the schema.

```
const Product = mongoose.model(Product, productSchema);
```

The user and audit javscript files have the same structure as this 'products' file. 


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


### Partials 
The navigationBar and copyright `.ejs` files are made in the `views/partials/` directory.

### Styles
The style `.ccs` file is in `public/stylesheets/` directory. 

## Unit Testing
### Overview
Our unit testing is performed with a combination of `jest` and `mongoose-memory-server` as well as github's Node.js Continuous integration workflow.

### Packages and Dependencies
Our testing framework requires the installation of several packages. In the top level project directory, you need to  `npm install` the following packages: `jest`, `jest-jasmine2`.
In the pet_website_app folder, you need to `npm install` the following packages: `mongodb-memory-server`.

### Configuration
There a few files that need to exist or be created in order for the current testing workflow to run.

In the top level directory, there needs to be a `jest.config.js` file with the following contents. This file allows for the done() function to work in `UnitTest.test.js`.
```
module.exports = {
    testRunner: 'jest-jasmine2',
    setupFilesAfterEnv: ['./jest.setup.js']
};
```

Additionally, the following code needs to be present in a `jest.setup.js` file in your top level directory. This increases the timeout period for all tests. This timeout period increase is necessary for github's virtual machines to finish all of the tests.
```
jest.setTimeout(30000);
```

The following configurations need to be included `package.json` in the top level directory. These are used to control the `npm start`, `npm ci`, and `npm test` commands used for testing.
```
"scripts": {
    "start": "cd pet_website_app && npm start",
    "ci": "cd pet_website_app && npm ci",
    "test": "jest --detectOpenHandles --forceExit"
  },
```

### Writing Unit Testing Code
All unit testing code is stored within `pet_website_app/UnitTests.jest.js`. If you would like to write more unit tests, add them to `pet_website_app/UnitTests.jest.js` or place them in a new file with the `.test.js` extension in any directory.

Jest runs test by running the `test` functions. The `test` function takes two arguments: a string representing the name of the test and a function that the test exectutes. The function should list `done` as an argument. Inside the test function will be several calls to `expect` followed by a call to `toBe`. Pass in an expression that you want to test to `expect`, then call `toBe` and pass in the expected value.

There are some additional functions in `UnitTests.jest.js` whose functionality is explained in the comments.

All tests that interact with our database use an in memory version of a mongodb database. Therefore, our actual database is not accessed or modified during testing.

### Running Unit Tests and Github Integration
To run unit tests, execute `npm test` in the top level directory or in the `pet_website_app` folder. All tests will run and jest will tell you which of these tests passed and which failed. If the test fails, jest will indicate which call to `expect` and `toBe` failed as well as showing the expected and actual output.

Unit tests will also be run anytime a push or pull request is made on any branch. To check if your tests passed, navigate to the actions tab of github and look for the action with the name of your last pushed commit. The Node.js CI workflow is found in the `github/workflows/node.js.yml` file. More information about the steps of the workflow can be found in comments in that file.








