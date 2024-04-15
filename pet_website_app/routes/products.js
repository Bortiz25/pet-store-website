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
    console.error('Error fetching products: ', error);
  }
});

router.post('/', async (req, res) => {
  const fAnimal = req.body.animal;
  const fTags = req.body.tag;
  try {
    productObjects = await fetchProducts();
    let productObjectsFilteredAnimal = [];
    let productObjectsFiltered = [];
    if(fAnimal == undefined) {
      productObjectsFilteredAnimal = productObjects;
    }
    else {
      for(i = 0; i < productObjects.length; i++) {
        if(productObjects[i].category == fAnimal) {
          productObjectsFilteredAnimal.push(productObjects[i]);
        }
      }
    }
    if(fTags == undefined) {
      productObjectsFiltered = productObjectsFilteredAnimal;
    }
    else if(typeof fTags === "string") {
      for(i = 0; i < productObjectsFilteredAnimal.length; i++) {
        let prodTags = productObjectsFilteredAnimal[i].tags;
        if(prodTags.includes(fTags)) {
          productObjectsFiltered.push(productObjectsFilteredAnimal[i]);
        }
      }
    }
    else{
      for(i = 0; i < productObjectsFilteredAnimal.length; i++) {
        let valid = true;
        let prodTags = productObjectsFilteredAnimal[i].tags;
        let j = 0;
        while(valid && j < fTags.length) {
          if(!(prodTags.includes(fTags[j]))) {
            valid = false;
          }
          j++;
        }
        if(valid) { productObjectsFiltered.push(productObjectsFilteredAnimal[i]); }
      }
    }
    res.render('pages/products', {
      title: 'Products',
      products: productObjectsFiltered,
      tags: fTags,
      animal: fAnimal,
    });
  } catch(error){console.error("Error filtering products")}
})

module.exports = router;
