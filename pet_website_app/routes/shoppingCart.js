var express = require('express');
var router = express.Router();
const productFunctions = require ('../controllers/productController');
const { User } = require('../models/user');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let display = [];
  let sum = 0;
  if(req.session.user==undefined) {
  }
  else {
    const user = await User.findOne( {userName : req.session.user.username} );
    display = user.cart;
    sum = await productFunctions.subtotal(display);
  }
  res.render('pages/shoppingCart', {
    title: 'Shopping Cart',
    products: display,
    subtotal: (Math.round(sum * 100) / 100)
  });
});

router.post('/:productId', async (req,res,next)=> {
  try {
    if(req.session.user!=undefined) { //if user is not logged in
      let num = req.body.number;
      let username = req.session.user.username;
      let prod = req.params.productId;
      if(num == 0) {
        await productFunctions.removeFromCart(username, prod);
      }
      else {
        await productFunctions.addToCart(username, prod, num);
      }
      const user = await User.findOne( {userName : username} );
      display = user.cart;
      let sum = await productFunctions.subtotal(display);
      console.log(sum);
      res.render('pages/shoppingCart', {
        title: 'Shopping Cart',
        products: display,
        subtotal: (Math.round(sum * 100) / 100)
      });
    }
  } catch (error){
    console.log("Error adding product to cart", error);
  }
});

module.exports = router;
