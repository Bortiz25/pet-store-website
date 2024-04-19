# Parrots and Ferrrets Website
## Legend

- [Setup](#setup)
- [Database.js](#database.js)
- [Models](#models)
- [Controllers](#controllers)
- [Development](#development)
- [User Manual](#user-manual)

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

After recieveing an invitation with access to the database, create an account then navigate to view all database deployments. Click on the "Cluster0" hyperlink then click on the collections tab. The database is named "Website" and it contains three collections. The three collections are named 'products', 'audits', and 'users'. 

A collection is like a table in SQL and a document is like a row in an SQL table.

### 'products' collection schema

{  
"_id": ObjectId,  
"productName": String,  
"price": Double,  
"tags": Array,  
"category": String,  
"img": String,  
"description": String,   
}

The 'products' collection stores product documents in JSON format. Each product document has a unique object ID that is automatically inserted each time you create a new document. The "productTag" field is an array of strings used for filtering products and "img" is a url to the product image. The "category" field for a product can be "Bird" or "Ferret". Products for both animals have "Both" as their category value. 

Below is an example of a document in the 'products' collection. A collection is a list of 'product' documents.

{   
"_id": ObjectId(849jkhsu4799o598),    
"productName": "Fancy Bowtie",    
"price": 23.44,    
"tags": [Expensive, Cool],    
"category": "Both",    
"img": "https://www.ties.com/assets/img/how-to-tie-a-tie/thumbs/bow-tie-knot.jpg",    
"description": "A fancy bowtie"      
}

### 'users' collection schema

{  
"_id": ObjectId,   
"firstName": String,  
“lastName": String,   
"email": String,    
"addy": String,  
"state": String,  
"country": String,  
"username": String,  
"password": String,  
"isAdmin": boolean  

"Cart": [{
"id_": ObjectId,  
"productName" : String,  
"quantity": Integer  
}]  
}

MongoDB is a flexible database, so you can insert a 'user' document without identifying each field. However, we have code in our application that ensures new user enters their first name, last name, username, and password. 

### 'audits' collection schema
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

```

const connectDb = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Successfully connected to mongoDB")

    }
    catch (error) {
        console.log("Error connecting to mongoDB: ", error.message);
    }
}
```

The mongoose.connect() function has a uri string paramater. The uri string for our database is located in our '.env' file. 

## Controllers
The 'productController' and 'userController' javascript files are located in the `contollers/` directory. The 'productController' contains functions to add, delete, and fetch products in our 'products' and 'audits' collections. The 'userController' contains functions to add and find users in our 'users' collection.

### Product Controller

Once we import the Product model to this file, we use mongoose.find() and mongose.exists() to query products.

**fetchProducts()**  

The async function 'fetchProducts' has no paramaters and returns an array contaning 'Product' class instances.

```
const productList = await Product.find();
```
In the 'fetchProducts()' function, we use mongoose.find() to retrieve a JSON array contanining all documents from MongoDB that match the sturcture defined by the Product model.

We then iterate through the 'productList' array and convert each JSON object into instances of our javascript 'Product' class. 

**addProduct()**

The async 'addProduct()' function accepts the name, price, tags, category, img, and description as parameters.

```
const prod = await Product.exists({productName: _name});
```
We use mongoose.exists() to check if a product with the given name exists, returning a boolean result. If the product does not exist, we create a new product instance using the 'new' keyword and pass all fields from the parameter to the constructor. 

```
const newProd = new Product({productName : _name, ...,
description: _description);
```

To save the product to our database, we use the mongoose.save() function. 

```
await newProd.save();
```
**auditProducts() & addAudit()**  

The async 'auditProducts' function is similiar to the 'fetchProduct' function. The only difference is that we use mongoose.find() on our 'Audit' model. The function returns an array of instances of our 'AuditClass'. 

```
const productList = await Audit.find();
```

The async 'addAudit' function accepts the name, admin name, and action paramaters. The 'addAudit()' adds a product to our 'audits' collection while the 'addProduct()' adds a product to our 'products' collection.

### User Controller

**addUser()**
The async 'addUser()' function accepts the fstName, lstName, email, address, country, state, username, and password parameters. Inside the function, we initialize an 'isAdmin' variable to false. The function is similar to 'addProducts()' in the 'productsController' file. 

In the async 'findUser' function we use mongoose.find() to return an array of queried user documents.

```
const ret = await User.find({userName: username, password: pw});
const user = ret[0];
```

We then return an object of the form : 
``` 
{userInfo: user, access: true};
```
If the username and paswword combination was found, 'access' is set to true, otherwise it is false.

## Models  
The `models/` directory contains the product, user, and audit `.js` files with their corresponding schemas. We create models for each schema to define data validation rules and enable easy querying of data in MongoDB.

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

 # `.ejs` files 
- about.ejs
- addProduct.ejs:
    includes the form admin users submit to add a new product.
- adminPage.ejs:
    Includes hyperlinks to `audit.ejs` and `addProduct.ejs`. This page contains a grid of all available products with corresponding delete buttons.
- audit.ejs: 
   Includes the audit table for all products.
- login.ejs/signup.ejs:
    This page includes the form users can submit to create/log in to their account
- products.ejs: 
   This page contains a grid of available products and code to filter 
   products by tags.
- shoppingCart.ejs: 

  
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



## User Manual

### Getting Started
When you open up our site you will be sent initially to the home page.From here you have a 
blue navigation bar that has all the choices of your next step. There are a few tabs but the 
one you are looking for is the one that says sign in at the end of the nav bar.

<img width="763" alt="login button" src="https://github.com/Bortiz25/pet-store-website/assets/99363092/28c15116-dbab-4164-89ce-a8d5af298c1a">

After navigating to the sign in page you will find the page below. The arrow indicates the "create user"
link which will help you navigate to the page where you can create an account.

<img width="467" alt="create user" src="https://github.com/Bortiz25/pet-store-website/assets/99363092/93246794-e448-422c-96bd-af8963523026">

Once you've created an account you can start shopping on the products page.

### Admin 
If you are an admin that will need to ability to create products and add them to our 
marketplace you will need to contact the company as the admin must be created by 
the developers at our company. 

Once you have an admin account you will be given an admin username and password. These
can be used to sign in on the log in page.

Once you have logged in you will be in the admin view of the website initially in the 
Admin Products page where you have the ability to delete products that are for sale. 

<img width="467" alt="delete product" src="https://github.com/Bortiz25/pet-store-website/assets/99363092/399c2491-0d4b-4e69-9ac1-224b3e360285">

This button will allow you to delete the products from the page and database. At 
the top of the Admin dashboard you will see a link to the add products page indicated
by an arrow in the next image.

<img width="1464" alt="add product" src="https://github.com/Bortiz25/pet-store-website/assets/99363092/35d434d8-6dca-4ff4-a050-58b009891454">

You will be taken to this page, all the necessary information that is needed to list an item 
will be indicated in the form. 

<img width="435" alt="Screenshot 2024-04-16 at 6 06 02 PM" src="https://github.com/Bortiz25/pet-store-website/assets/99363092/e6eb5a56-668e-41be-b446-49ffd01016a0">

On the same page if you click the audit button you will be guided to the audit table. Which 
indicates data about the admin and items. 


<img width="933" alt="Screenshot 2024-04-16 at 6 08 06 PM" src="https://github.com/Bortiz25/pet-store-website/assets/99363092/9b04d2c6-7734-498d-b746-07d81b08ff8e">

This table indicates when you add and delete products as an admin. 

