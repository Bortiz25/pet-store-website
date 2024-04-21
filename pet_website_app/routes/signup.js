var express = require('express');
var router = express.Router();
const userFunctions = require ('../controllers/userController');



 router.post('/', async (req, res, next ) => {
    // returns boolean 'true' if account was added to database  
    const addedUser = await userFunctions.addUser(req.body.fname,
             req.body.lname,
             req.body.email,
             req.body.address,
             req.body.state,
             req.body.country,
             req.body.username,
             req.body.password);
        
        if(addedUser){
            // user infromation was added to database. Ahow alert then redirect to log in page
            res.send(
                '<script> alert("Your account was created!"); </script>'+
                '<script> window.location.href = "/pages/login"; </script>'
                );
               
        } else {
            res.send(
                '<script> alert("This username already exists. Please enter a different username"); </script>'+
                '<script> window.location.href = "/pages/signup"; </script>'
                );
        }

     });

router.get('/', function(req, res, next){
    res.render('pages/signup', {
        title: 'Sign Up'
    });
});

module.exports = router;