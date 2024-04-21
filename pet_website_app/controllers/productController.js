const {Product, ProductClass} = require ('../models/product');
const {Audit, AuditClass} = require ('../models/audit');
const {User, UserClass} = require ('../models/user');

async function auditProducts() {
    try {
    // productList is an array of JSON objects from MongoDB
    const productList = await Audit.find();
    let productObjects = [];
    // create array of product objects
    for(i=0; i < productList.length; i++){
    let prod = new AuditClass(productList[i].productName, productList[i].adminName, 
        productList[i].action, productList[i].timeStamp);
    productObjects.push(prod);
    }
    return productObjects;
    
    } catch (err) {
        console.log("error fetching audit products" , err);
    }
  }

  async function fetchProducts() {
    try {
    // productList is an array of JSON objects from MongoDB
    const productList = await Product.find();
    let productObjects = [];
    // create array of product objects
    for(i=0; i < productList.length; i++){
    let prod = new ProductClass(productList[i].productName, productList[i].price, 
        productList[i].tags, productList[i].category, productList[i].img, productList[i].description);
    productObjects.push(prod);
    }
    return productObjects;
    
    } catch (err) {
        console.log("error fetching products" , err);
    }
  }
async function addProduct(_name,_price,_tags,_category,_img,_description) {
  // Queries the database to see if there is already a product with the same name
  const prod = await Product.exists({productName: _name});
  // If there does not exist a product already, make a new one
  if(!prod) {
    const newProd = new Product({productName : _name,
      price: _price,
      tags: _tags,
      category: _category,
      img: _img,
      description: _description,
      timeStamp: (new Date().toString())
      });
     
    newProd.save();
    return true;
  } else {
    return false;
  }
}

async function addToCart(username, prodName) {
  const prod = await Product.findOne({productName: prodName});
  await User.updateOne({ userName : username }, { $addToSet: {cart : prod} });
}

async function removeFromCart(username, prodName) {
  const prod = await Product.findOne({productName: prodName});
  await User.updateOne({ userName : username }, { $pull: { cart : prod } });
}

async function addAudit(_name,_admin,_action) {
  try {
    const prod = new Audit({productName : _name,
      adminName: _admin,
      action: _action,
      timeStamp: (new Date().toString())
      });
  prod.save();
    return true
  }
   catch (err) {
    console.log("Error adding product to audit database" , err);
  }
}

async function deleteProduct(_name) {
 try {
  await Product.deleteOne({productName: _name});
 }
 catch (err) {
  console.log("Error deleting product from database ", err);
 }
}


module.exports = {addProduct, fetchProducts, addAudit, auditProducts, deleteProduct, addToCart, removeFromCart}; 