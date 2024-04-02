var express = require('express')
var router = express.Router()
const fetchProducts = require ('../controllers/fetchController');


router.get('/', async function(req,res,next) {
  try {
  productObjects = await fetchProducts();

  res.render('pages/products', {
    title: 'Products',
    products: productObjects
  });
} catch (error) {
    console.error('Error fetching products: ', error);
  }
});

module.exports = router;
