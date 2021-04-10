const jwt = require('jsonwebtoken');
const JWTsecret = require('../Config/JWTsecret');

//* For validation and checking for presence of jwtAUTH cookie on the browser before allowing access to restricted pages.
const reqAuth = (req, res, next) => {
    const token = req.cookies.jwtAUTH;
    if(token){
        jwt.verify(token, JWTsecret, (err, decodedToken) => {
            if(err){
                console.log('JWT token was not valid, redirecting . . .');
                res.status(403).json({response: 'You are not authorized to access this page !'});
                res.end();
            }
            else{
                console.log('Allowing authenticated User . . .');
                console.log(decodedToken);
                next();
            }
        });
    }
    else{
        res.status(403).json({response: 'You are not authorized to access this page !'});
        res.end();
    }
}

module.exports = { reqAuth };