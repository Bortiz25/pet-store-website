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

