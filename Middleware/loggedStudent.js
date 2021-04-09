// Requiring jwt verifier and secret string.
const jwt = require('jsonwebtoken');
const JWTsecret = require('../Config/JWTsecret');

// Requiring User model.
const Student = require('../models/Student');

// Middleware to establish user currently accessing the site.
const checkLoggedStudent = (req, res, next) => {
    const token = req.cookies.jwtAUTH;

    if(token){
        jwt.verify(token, JWTsecret, async (err, decodedToken) => {
            if(err){
                res.locals.student = null;
                next();
            }
            else{
                let student = await Student.findById(decodedToken.id);
                res.locals.student = student;
                next();
            }
        });
    }
    else{
        res.locals.student = null;
        next();
    }
}

module.exports = { checkLoggedStudent };