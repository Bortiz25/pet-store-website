var express = require('express');
var router = express.Router();
const productFunctions = require('../controllers/productController');

router.post('/', async (req, res, next) => {
   await productFunctions.addProduct(
            req.body.name,
            Number(req.body.price),
            (req.body.tags),
            req.body.category,
            req.body.img,
            req.body.desc);
     
    await productFunctions.addAudit(req.body.name, "Seth", "Added product");
      res.redirect('adminPage');
      
  });
      
    router.get('/', function(req, res, next) {
      res.render('pages/addProduct', { title: 'Add product'});
    });

module.exports = router;
