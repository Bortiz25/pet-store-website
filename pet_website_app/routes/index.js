var express = require('express');
var router = express.Router();
const productFunctions = require ('../controllers/productController');
const { User } = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  const user = req.session.user;
  res.render('index', { title: 'Parrots and Ferrets', user: user });
});

router.post('/', async function(req, res, next) {
  try {
    if(req.session.user!=undefined) { //if user is logged in
      let username = req.session.user.username;
      await productFunctions.clearCart(username);
      res.send('<script> alert("Thank you for shopping with us!"); </script>' + '<script> window.location.href = "/"; </script>');
    }
    else {
      res.send('<script> alert("Thank you for shopping with us!"); </script>' + '<script> window.location.href = "/"; </script>');
    }
  } catch (error){
    console.log("Error adding product to cart", error);
  }
});

module.exports = router;