var express = require('express');
var router = express.Router();
// 'productFunctions' is an object containing the 'addProduct' and 'addAudit' functions 
const productFunctions = require('../controllers/productController');

// route to add product when admin submits 'addProduct.ejs' form
router.post('/', async (req, res, next) => {
      await productFunctions.addProduct(
        req.body.name,
        Number(req.body.price),
        (req.body.tags),
        req.body.category,
        req.body.img,
        req.body.desc);

    await productFunctions.addAudit(req.body.name, req.session.user.name, "Added product");
    res.redirect('adminPage');
  });
      
    router.get('/', function(req, res, next) {
      res.render('pages/addProduct', { title: 'Add product'});
    });

module.exports = router;
