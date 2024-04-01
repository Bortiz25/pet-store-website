var express = require('express');
var router = express.Router();

//router.use(express.json);
const {Product, ProductClass} = require ('../models/product');

async function fetchProduct() {
// productList is an array of JSON objects from MongoDB
 try {
  const productList = await Product.find();

  let productObjects = [];
  // create array of product objects
  for(i=0; i < productList.length; i++){
    let prod = new ProductClass(productList[i].productName, productList[i].price, 
      productList[i].tags, productList[i].category, productList[i].img, 
      productList[i].description);
    productObjects.push(prod);
  }
   return productObjects;
  } catch (err) {
    console.log("Error fecthing products", err);
  }
}

async function deleteProduct(name_) {
    try {
    const value = await Product.deleteOne({productName: name_});
    console.log("we deleted it!!");
    console.log(value);

    } catch (err){
      console.log("error deleting product:", err);
    }
  }


// route to delete product 
router.post('/:productId', async (req,res,next)=> {
  try { 
  const val = await Product.deleteOne({productName: req.params.productId});
  console.log("product deleted");
  console.log(val);
  res.redirect('/pages/adminPage');
  } catch (err){
    console.log("error deleting product", error);
  
  }
});
  //route to get products 

  router.get('/', async function(req,res,next) {
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
  
    res.render('pages/adminPage', {
      title: 'Products',
  
      products: productObjects,
  
    });
  } catch (error) {
      console.error('Error fetching products: ', error);
    }
  });
 

module.exports = router;
