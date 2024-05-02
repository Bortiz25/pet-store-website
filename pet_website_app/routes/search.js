var express = require('express')
var router = express.Router()
const productFunctions = require ('../controllers/productController');
const Fuse = require('fuse.js');


router.get('/', async function(req,res,next) {
  console.log(req.session);
  const user1 = req.session.user;
  try {
  productObjects = await productFunctions.fetchProducts();

  res.render('pages/products', {
    title: 'Products',
    products: productObjects,
    tags: [],
    animal: "Both",
    user: user1
  });
  } catch (error) {
    console.error('Error searching: ', error);
  }
});

router.post('/', async (req, res) => {
  const user1 = req.session.user;
  const term = req.body.search.toLowerCase();
  console.log(term);
  try {
    productObjects = await productFunctions.fetchProducts();

    const fuse = new Fuse(productObjects, {
      keys: ['productName'], 
      includeScore: true, 
      threshold: 0.7, // set a threshold for fuzzy search (0.7 is a common value)
      ignoreLocation: true, 
    });

    // perform the fuzzy search
    const result = fuse.search(term);

    // map the results to get the actual products
    const searched = result.map(({ item }) => item);

    res.render('pages/products', {
      title: 'Products',
      products: searched,
      tags: [],
      animal: "Both",
      user: user1
    });
  } catch(error) {
    console.error("Error searching products", error);
  }
});

module.exports = router;
