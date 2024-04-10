const {Product, ProductClass} = require ('../models/product');

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


module.exports = {addProduct, fetchProducts};