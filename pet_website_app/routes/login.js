const express = require('express');
const router = express.Router();
const {User, UserClass} = require ('../models/user');

/* GET login page */ 
router.get('/', async function(req, res, next){
    res.render('pages/login', {title: 'log in'});
        // User.find({}, function(err, users) {
        //     res.render('pages/login', {
        //         title: 'Sign In',
        //         users: users
        //     });
        // });
});

router.post('/', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    console.log(password);
    User.exists({userName: username}, (err, user) =>{
        if(user){
            res.redirect('pages/products');
        } else if(err){
            console.log(err);
        }
        // else {
        //     res.redirect('/');
        // }
    })
})

module.exports = router;