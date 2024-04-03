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

module.exports = fetchProducts;