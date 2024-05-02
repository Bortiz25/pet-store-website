const express = require('express');
const router = express.Router();
const userFunctions = require ('../controllers/userController');
const {User, UserClass} = require ('../models/user');


router.post('/', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
     // userInfo is in JSON and the 'access' value is a boolean 
     const {userInfo, access} = await userFunctions.findUser(username, password);
     // if 'access' is true, user entered correct username and pw 
     if(access){    
        //adding users to the session
        await User.findOne({userName:username, password: password}).then((user) => {
            req.session.user = {
                username: user.userName,
                lastName: user.lastName,
                address: user.address,
                state: user.state,
                name: user.firstName,
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
    const user = undefined; // REQUISITE TO RERENDER THE LOGOUT BUTTON
    res.render('pages/login', {title: 'Sign In', user: user});
});

module.exports = router;