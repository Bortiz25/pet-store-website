var express = require('express')
var router = express.Router()
//router.use(express.json);
const {Product, ProductClass} = require ('../models/product');

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

  const prod = await Product.exists({productName: 'toothbrush'});
  console.log(prod);

  res.render('pages/products', {
    title: 'Products',

    products: productObjects,

    //products: productList

  });
} catch (error) {
    console.error('Error fetching products: ', error);
  }
});

module.exports = router;
