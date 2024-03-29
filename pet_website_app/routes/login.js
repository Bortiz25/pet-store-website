const express = require('express');
const router = express.Router();
const {User, UserClass} = require ('../models/user');


router.post('/', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
    const ret = await User.find({userName: username, password: password});
    const user = ret[0];
    if(ret.length != 0 && !user.isAdmin) {
        res.render('pages/products', {user: ret, title: "Products"});
    }else if(ret.length != 0 && user.isAdmin){
        res.render('pages/adminPage', {title: 'Admin'});
    } else res.redirect('/');
    } catch(error){error("Error: getting user from database")}
})

/* GET login page */ 
router.get('/', function (req, res) {
    res.render('pages/login', {title: 'log in'});
});


module.exports = router;