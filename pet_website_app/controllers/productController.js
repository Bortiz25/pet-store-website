const {Product, ProductClass} = require ('../models/product');
const {Audit, AuditClass} = require ('../models/audit');
const {User, UserClass} = require ('../models/user');

async function auditProducts() {
    try {
      // 'auditList' is an array of JSON documents from the 'audits' collection in MongoDB
      const auditList = await Audit.find();
      let auditObjects = [];
      // convert to array of 'AuditClass' instances
      for(i=0; i < auditList.length; i++){
      let prod = new AuditClass(auditList[i].productName, auditList[i].adminName, 
          auditList[i].action, auditList[i].timeStamp);
      auditObjects.push(prod);
      }
      return auditObjects;
      
    } catch (error) {
        console.log("Error fetching products from 'audits' collection: " , error);
    }
  }

  async function fetchProducts() {
    try {
    // 'productList' is an array of JSON documents from the 'audits' collection in MongoDB
    const productList = await Product.find();
    let productObjects = [];
    // convert to array of 'AuditClass' instances
    for(i=0; i < productList.length; i++){
    let prod = new ProductClass(productList[i].productName, productList[i].price, 
        productList[i].tags, productList[i].category, productList[i].img, productList[i].description);
    productObjects.push(prod);
    }
    return productObjects;
    
    } catch (error) {
        console.log("Error fetching products from 'products' collection: " , error);
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

async function addToCart(username, prodName, amt) {
  const prod = await Product.findOne({productName: prodName});
  let cost = prod.price * amt;
  let newProd = prod;
  newProd.price = cost;
  await User.updateOne({ userName : username }, { $pull: { cart : {productName : prodName} } });
  //await User.updateOne({ userName : username }, { $pull: {cart : {productName : prodName}} });
 await User.updateOne({ userName : username }, { $addToSet: {cart : newProd}} );
}

async function removeFromCart(username, prodName) {
  const prod = await Product.findOne({productName: prodName});
  await User.updateOne({ userName : username }, { $pull: { cart : {productName : prodName} } });
}

async function clearCart(username) {
  await User.updateOne({ userName : username }, { cart : [] });
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
   catch (error) {
    console.log("Error adding product to 'audits' collection: " , error);
  }
}

async function deleteProduct(_name) {
 try {
  const doc = await Product.deleteOne({productName: _name});
  return doc.deletedCount == 1;
 }
 catch (error) {
  console.log("Error deleting product from 'products' collection: ", error);
  return false;

 }
}
async function deleteAudit(_name) {
  try {
   const doc = await Audit.deleteOne({productName: _name});
   return doc.deletedCount == 1;
  }
  catch (error) {
   console.log("Error deleting product from 'audits' collection: ", error);
   return false;
 
  }
 
 }

async function subtotal(cart) {
  let sum = 0;
  for(i=0; i < cart.length; i++) {
    sum+=cart[i].price;
  }
  return sum;
}

module.exports = {addProduct, fetchProducts, addAudit, auditProducts, deleteProduct, deleteAudit, addToCart, removeFromCart, subtotal, clearCart}; 
