const express = require('express');
const router = express.Router();
const {User, UserClass} = require ('../models/user');

/* GET login page */ 
router.get('/', async function(req, res, next){
    //res.render('pages/login', {title: 'Sign In'});
    try {
        User.find({}, function(err, users) {
            res.render('pages/login', {
                title: 'Sign In',
                users: users
            });
        });
    } catch (error) {
        console.error('Error fetching users: ', error);
    }
});

router.post('/', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.exists({userName: username, password:password}, (err, user) =>{
        if(user){
            res.redirect('pages/products');
        } else if(err){
            console.log(err);
        }else {
            res.redirect('/');
        }
    })
})

module.exports = router;