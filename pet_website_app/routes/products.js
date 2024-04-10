var express = require('express')
var router = express.Router()
const productFunctions = require ('../controllers/productController');


router.get('/', async function(req,res,next) {
  try {
  productObjects = await productFunctions.fetchProducts();

  res.render('pages/products', {
    title: 'Products',
    products: productObjects
  });
} catch (error) {
    console.error('Error fetching products: ', error);
  }
});

module.exports = router;
