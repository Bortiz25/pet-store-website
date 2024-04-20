const express = require('express');
const router = express.Router();
const productFunctions = require ('../controllers/productController');

   router.get('/', async function(req,res,next) {
    try {
    productObjects = await productFunctions.auditProducts();
    res.render('pages/audit', {
      title: 'Audit',
      products: productObjects
    });
    } catch (error) {
        console.error('Error fetching audit products: ', error);
        }
  });

   // route to delete all products when the 'clear all' button is clicked on audit page
   router.post('/', async (req,res,next)=> {
    try { 
      productObjects = await productFunctions.auditProducts();
      for(let i = 0; i < productObjects.length; i++) {
        // returns boolean determining if product was deleted 
        const complete = await productFunctions.deleteAudit(productObjects[i].productName);

        if (!complete) {
          console.log("Error deleting this product from 'audits' collection: " + productObjects[i].productName);
        }
      }
     res.redirect('/pages/audit');
    } catch (error){
        console.log("Error deleting all products from the 'audits' collection: ", error);
    }
    });
  module.exports = router;
 