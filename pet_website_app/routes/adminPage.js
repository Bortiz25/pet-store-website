const express = require('express');
const router = express.Router();
const productFunctions = require ('../controllers/productController');

    // route to delete product when the 'delete' button is clicked on adminPage
    router.post('/:productId', async (req,res,next)=> {
    try { 
     await productFunctions.deleteProduct(req.params.productId);
     await productFunctions.addAudit(req.params.productId, req.session.user.name, "Deleted product");
    res.redirect('/pages/adminPage');
    } catch (error){
        console.log("Error deleting product: ", error);
    }
    });
   // render admin page
   router.get('/', async function(req,res,next) {
    const user = req.session.user;
    try {
    productObjects = await productFunctions.fetchProducts();
    res.render('pages/adminPage', {
      title: 'Admin Dashboard',
      products: productObjects,
      user: user
    });
    } catch (error) {
        console.error('Error fetching products: ', error);
        }
  });

  module.exports = router;
 