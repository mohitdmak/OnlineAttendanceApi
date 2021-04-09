//Importing Teacher model and jwt string and bcrypt for password verification. 
const express = require('express');
const Student = require('../models/Student.js');
const bcrypt = require('bcrypt');
const JWTsecret = require('../Config/JWTsecret');
const jwt = require('jsonwebtoken');


//Creating json web token.
const maxAge = 60*60*24;
const createToken = (id) => {
    return jwt.sign({id}, JWTsecret, {
        expiresIn: maxAge
    });
};

//error handling to determine the exact error user made in filling form of auth.
function handleError(err){

    //* We are creating a JS object with the types of errors, so that we can output them together to the user.
    let errors = {email: '', password: '', Name:''};

    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
        console.error(errors);
    }

    //* We cannot fill an error message with [true,''] for the 'unique' field in the schema like we did for other fields, thus seperate handling is required for it using err.code .
    if(err.code === 11000){
        errors.email = 'An account with this email id already exists.';
    }

    return errors;
}

//* ALL CONTROLLER FUNCTIONS.

const post_signup = (req, res) => {
    var student = new Student(req.body);
    student.save()
        .then((result) => {
            console.log('New Student has registered.');
            //* Creating new jwt token for the teacher and placing cookie on the browser to provide permission for classrooms.
            const token = createToken(student._id);
            res.cookie('jwtAUTH', token, {httpOnly: true, maxAge: maxAge*1000});

            //api response
            res.status(201).send(result);
        }).catch((err) => {
            var error = handleError(err);
            console.log('User has made an error in signup form.')
            
            //api response
            res.status(400).json(err);
        });
};

const get_signup = (req, res) => {
    res.status(200).json({ response: 'Welcome, to  signup, please send your [Name, Emailaddress, Password] via a post request on this url !'});
};

const post_login = (req, res) => {
    Student.findOne({ email: req.body.email })
        .then((foundStudent) => {
            if(foundStudent !== null){
                bcrypt.compare(req.body.password, foundStudent.password)
                    .then((result) => {
                        console.log(result);
                        if(result === true){
                            console.log('A Student has logged in successfully.');
                            //* Creating new jwt token for the teacher and placing cookie on the browser to provide permission for classrooms.
                            const token = createToken(foundStudent._id);
                            res.cookie('jwtAUTH', token, {httpOnly: true, maxAge: maxAge*1000});

                            //api response
                            res.status(200).send(foundStudent);
                        }
                        else{
                            console.log('Student has entered an incorrect password.');
                            res.status(401).json({response: 'You have entered an incorrect password!'});
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            else{
                console.log('Student has tried to login through unregistered email id');
                res.status(401).json({response: 'The email does not exist in our db, please signup!'});
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

const get_login = (req, res) => {
    res.status(200).json({ response: 'Welcome, to  login, please send your [Emailaddress, Password] on request body via a post request on this url !' });
};

const get_logout = (req, res) => {
    console.log('User has logged out.')
    //expiring the jwt cookie
    res.cookie('jwtAUTH', '', { maxAge:  1 });
    res.status(200).json({response: 'You have successfully logged out !'});
};

module.exports = {
    get_signup,
    get_login,
    post_signup,
    post_login,
    get_logout
}
