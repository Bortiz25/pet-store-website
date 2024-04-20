const express = require('express');
const router = express.Router();
const userFunctions = require ('../controllers/userController');

router.get('/', (req, res) => {
    if(req.session.user && req.session){
        const username = req.session.user.username;
        const firstName = req.session.user.firstName;
        const lastName = req.session.user.lastName;
        const address = req.session.user.address;
        const state = req.session.user.state;

        res.render('pages/accountPage', {
            title: "User Account",
            username: username,
            firstName: firstName,
            lastName: lastName,
            address: address,
            state: state
        });
    } else {
        res.redirect('login');
    }
})

module.exports = router;