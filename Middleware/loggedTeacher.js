// Requiring jwt verifier and secret string.
const jwt = require('jsonwebtoken');
const JWTsecret = require('../Config/JWTsecret');

// Requiring User model.
const Teacher = require('../models/Teacher');

// Middleware to establish user currently accessing the site.
const checkLoggedTeacher = (req, res, next) => {
    const token = req.cookies.jwtAUTH;

    if(token){
        jwt.verify(token, JWTsecret, async (err, decodedToken) => {
            if(err){
                res.locals.teacher = null;
                next();
            }
            else{
                let teacher = await Teacher.findById(decodedToken.id);
                res.locals.teacher = teacher;
                next();
            }
        });
    }
    else{
        res.locals.teacher = null;
        next();
    }
}

module.exports = { checkLoggedTeacher };