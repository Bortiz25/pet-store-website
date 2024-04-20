var express = require('express');
var router = express.Router();
const productFunctions = require ('../controllers/productController');
const { User } = require('../models/user');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let display = [];
  if(req.session.user==undefined) {

  }
  else {
    const user = await User.findOne( {userName : req.session.user.username} );
    display = user.cart;
  }
  res.render('pages/shoppingCart', {
    title: 'Shopping Cart',
    products: display
  });
});

router.post('/:productId', async (req,res,next)=> {
  try {
    if(req.session.user==undefined) { //if user is not logged in

    }
    else { //if user is logged in
      let user = req.session.user.username;
      let prod = req.params.productId;
      productFunctions.addToCart(user, prod);
    }
    res.redirect('/pages/products');
  } catch (error){
    console.log("Error adding product to cart", error);
  }
});

module.exports = router;
