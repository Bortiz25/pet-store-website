var express = require('express');
var router = express.Router();
// 'productFunctions' is an object containing the 'addProduct' and 'addAudit' functions 
const productFunctions = require('../controllers/productController');

// route to add product when admin submits 'addProduct.ejs' form
router.post('/', async (req, res, next) => {
      const user = req.session.user;
      const addedProd = await productFunctions.addProduct(
        req.body.name,
        Number(req.body.price),
        (req.body.tags),
        req.body.category,
        req.body.img,
        req.body.desc);
      if(addedProd){
        await productFunctions.addAudit(req.body.name, req.session.user.name, "Added product");
        // alert message that product was added
        res.send(
          '<script> alert("Your product was added!"); </script>'+
          '<script> window.location.href = "/pages/adminPage"; </script>'
          );
      }
      else {
        // alert message that a product with that exact name already exists
        res.send(
          '<script> alert("A product with this name already exists. Please enter a unique product name."); </script>'+
          '<script> window.location.href = "/pages/addProduct"; </script>'
          );
      }
  });
      
    router.get('/', function(req, res, next) {
      res.render('pages/addProduct', { title: 'Add product', user: user});
    });

module.exports = router;
