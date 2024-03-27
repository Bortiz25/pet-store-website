var express = require('express');
var router = express.Router();
const {Product, ProductClass} = require ('../models/product');



async function addProduct(_name,_price,_tags,_category,_img,_description) {
  // Queries the database to see if there is already a product with the same name
  const prod = await Product.exists({productName: _name});

  // If there does not exist a product already, make a new one
  if(prod == null) {
    const newProd = new Product({productName : _name,
      price: _price,
      tags: _tags,
      category: _category,
      img: _img,
      description: _description});
    newProd.save();
    return true;
  } else {
    return false;
  }
}

router.get('/', function(req, res, next) {
  res.render('pages/addProduct', { title: 'Add Product', addProduct: addProduct});
});

module.exports = router;
