const express = require('express');
const router = express.Router();
const {User, UserClass} = require ('../models/user');
const fetchProducts = require ('../controllers/fetchController');


router.post('/', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
    const ret = await User.find({userName: username, password: password});
    const user = ret[0];
    productObjects = await fetchProducts();
    if(ret.length != 0 && !user.isAdmin) {
        res.render('pages/products', {
          user: ret,
          title: "Products",
          products: productObjects,
          tags: [],
          animal: "Both"
        });
    }else if(ret.length != 0 && user.isAdmin){
        res.render('pages/adminPage', {title: 'Admin', products: productObjects});
    } else res.render('pages/login', {title: 'log in'});
    } catch(error){error("Error: getting user from database")}
})

/* GET login page */ 
router.get('/', function (req, res) {
    res.render('pages/login', {title: 'Sign In'});
});


module.exports = router;