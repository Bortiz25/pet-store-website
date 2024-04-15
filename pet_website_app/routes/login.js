const express = require('express');
const router = express.Router();
const userFunctions = require ('../controllers/userController');

const {User, UserClass} = require ('../models/user');


router.post('/', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

     // userInfo is in JSON format. The pw value is a boolean 
     const {userInfo, pw} = await userFunctions.findUser(username, password);
     //if pw is true, user entered correct pw
     if(pw){    
        //adding users to the session
        await User.findOne({userName:username, password: password}).then((user) => {
            req.session.user = {
                username: user.userName,
                isAdmin: user.isAdmin,
            }
        });
        if(userInfo.isAdmin){
            res.redirect('adminPage');
        } else {
                res.redirect('products');
        }
    }
    // username and/or pw was incorrect. 
    else {
        res.send(
        '<script> alert("Incorrect username and/or password."); </script>'+
        '<script> window.location.href = "/pages/login"; </script>'
        );
    }
});


/* GET login page */ 
router.get('/', function (req, res) {
    if(req.session.user) req.session.user = null;
    res.render('pages/login', {title: 'log in'});
});

module.exports = router;