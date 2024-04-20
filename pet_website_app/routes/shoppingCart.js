var express = require('express');
var router = express.Router();
const productFunctions = require ('../controllers/productController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/shoppingCart', { title: 'Shopping Cart' });
});

router.post('/:productId', async (req,res,next)=> {
  try {
   console.log(req.params.productId);
   console.log(req.session.user.username);
   console.log("PRINTED");
  res.redirect('/pages/products');
  } catch (error){
    console.log("Error adding product to cart", error);
  }
});

module.exports = router;
