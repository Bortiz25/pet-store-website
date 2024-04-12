var express = require('express');
var router = express.Router();
const userFunctions = require ('../controllers/userController');



 router.post('/', async (req, res, next ) => {
    await userFunctions.addUser(req.body.fname,
             req.body.lname,
             req.body.email,
             req.body.address,
             req.body.state,
             req.body.country,
             req.body.username,
             req.body.password);

         res.render('pages/login', {title: 'log in'});
     });

router.get('/', function(req, res, next){
    res.render('pages/signup', {
        title: 'Sign Up'
    });
});

module.exports = router;