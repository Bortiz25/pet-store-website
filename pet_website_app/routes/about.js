var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const user = req.session.user;
  res.render('pages/about', {
    title: 'About Us',
    logo: "https://i.ibb.co/dk8xG80/Colibri.png",
    ferret: "https://images.saymedia-content.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTk3MDkzMDk4NTcwOTE3MTgz/are-ferrets-hypoallergenic.jpg",
    bird: "https://www.thesprucepets.com/thmb/r9biBxeD-BBYc6m0nebJzxRPFBA=/1975x0/filters:no_upscale():strip_icc()/GettyImages-597187685-58164cb83df78cc2e89b8cd3.jpg", user: user
  });
});

module.exports = router;
