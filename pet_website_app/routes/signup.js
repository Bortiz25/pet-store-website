var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('pages/signup', {
        title: 'Sign Up'
    });
});

module.exports = router;