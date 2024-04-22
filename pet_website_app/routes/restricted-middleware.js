const adminMiddleware = (req, res, next) => {
    //console.log('comeplete user session', req.session);
    if(req.session && req.session.user){
        if(req.session.user.isAdmin) next();
    }else {
        res.status(401).json({message: 'Page not available unless you are an admin. '});
    }
}

// const loginMiddleware = (req, res, next) => {
//     console.log('comeplete user session', req.session);
//     if(req.session && req.session.user){
        
//     }else {
//         req.status(401).json({message: 'Page not available unless you are an admin. '});
//     }
// }

module.exports = {adminMiddleware}