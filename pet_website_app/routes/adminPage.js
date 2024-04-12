const express = require('express');
const router = express.Router();
const productFunctions = require ('../controllers/productController');
const {Product, ProductClass} = require ('../models/product');

    //route to delete product 
    router.post('/:productId', async (req,res,next)=> {
    try { 
     await Product.deleteOne({productName: req.params.productId});
     await productFunctions.addAudit(req.params.productId, "Seth", "Deleted product");
    res.redirect('/pages/adminPage');
    } catch (err){
        console.log("error deleting product", error);
    }
    });

   router.get('/', async function(req,res,next) {
    try {
    productObjects = await productFunctions.fetchProducts();
    res.render('pages/adminPage', {
      title: 'Admin Dashboard',
      products: productObjects
    });
    } catch (error) {
        console.error('Error fetching products: ', error);
        }
  });

  module.exports = router;
 