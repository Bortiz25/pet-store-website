const express = require('express');
const router = express.Router();
const productFunctions = require ('../controllers/productController');
const {Audit, AuditClass} = require ('../models/audit');

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

  module.exports = router;
 