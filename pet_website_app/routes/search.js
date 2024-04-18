var express = require('express')
var router = express.Router()
const productFunctions = require ('../controllers/productController');


router.get('/', async function(req,res,next) {
  console.log(req.session);
  try {
  productObjects = await productFunctions.fetchProducts();

  res.render('pages/products', {
    title: 'Products',
    products: productObjects,
    tags: [],
    animal: "Both",
  });
  } catch (error) {
    console.error('Error searching: ', error);
  }
});

router.post('/', async (req, res) => {
  const term = req.body.search;
  console.log(term);
  try {
    productObjects = await productFunctions.fetchProducts();
    let searched = [];
    for(i=0; i < productObjects.length; i++) {
      if((productObjects[i].productName).toLowerCase() == term.toLowerCase()) { searched.push(productObjects[i]) }
    }
    res.render('pages/products', {
      title: 'Products',
      products: searched,
      tags: [],
      animal: "Both",
    });
  } catch(error){console.error("Error searching products")}
})

module.exports = router;
