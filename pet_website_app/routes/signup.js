var express = require('express');
var router = express.Router();
const {User, UserClass} = require('../models/user');


router.post('/', async (req, res, next ) => {
    doesExist = await User.exists({userName: req.body.username});
    if(!doesExist){
        let isAdmin;
        if(req.body.admin) {
            isAdmin = true;
        } else{
            isAdmin = false;
        }
        const newUser = new User({
            firstName: req.body.fname,
            lastName: req.body.lname,
            email: req.body.email,
            address: req.body.address,
            state: req.body.state,
            country: req.body.country,
            userName: req.body.username,
            password: req.body.password,
            isAdmin: isAdmin
        });
        newUser.save();
        res.render('pages/login', {title: 'log in'});
    }
    else res.render('/');
})

router.get('/', function(req, res, next){
    res.render('pages/signup', {
        title: 'Sign Up'
    });
});

module.exports = router;