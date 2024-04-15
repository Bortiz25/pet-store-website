module.exports = (req, res, next) => {
    console.log('session object', req.session);
    next();
}