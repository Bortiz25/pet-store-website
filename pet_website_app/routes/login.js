const express = require('express');
const router = express.Router();
const {User, UserClass} = require ('../models/user');
const fetchProducts = require ('../controllers/productController');


router.post('/', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
    const ret = await User.find({userName: username, password: password});
    const user = ret[0];
    productObjects = await fetchProducts();
    if(ret.length != 0 && !user.isAdmin) {
        res.redirect('products');
    }else if(ret.length != 0 && user.isAdmin){
        res.redirect('adminPage');
    } else res.redirect('/');
    } catch(error){console.log("Error: getting user from database", error)}
})

/* GET login page */ 
router.get('/', function (req, res) {
    res.render('pages/login', {title: 'log in'});
});

module.exports = router;