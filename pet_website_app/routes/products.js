var express = require('express')
var router = express.Router()
const {Product, ProductClass} = require ('../models/product');


router.get('/', async function(req,res,next) {
  try {
  // productList is an array of JSON objects from MongoDB
  const productList = await Product.find();
  res.render('pages/products', {
    title: 'Products',
    products: productList
  });
} catch (error) {
    console.error('Error fetching products: ', error);
  }
});

module.exports = router;
