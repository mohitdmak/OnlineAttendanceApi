//Importing Teacher model and jwt string and bcrypt for password verification. 
const express = require('express');
const Classroom = require('../models/Classroom');
const jwt = require('jsonwebtoken');

//error handling to determine the exact error user made in filling form of auth.
function handleError(err){

    //* We are creating a JS object with the types of errors, so that we can output them together to the user.
    let errors = {Subject: '', Teacher: '', Students:''};

    if(err.message.includes('classroom validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
        console.error(errors);
    }

    return errors;
}

//* ALL CONTROLLER FUNCTIONS.

const get_all = (req, res) => {
    Classroom.find()
        .then((result) => {
            console.log('Data for all classrooms has been fetched.');

            //api response
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
        });
};

const post_create = (req, res) => {
    const teacher = res.locals.teacher;
    if(teacher){
    
        const subject = req.body.Subject;
        Class = new Classroom({Subject: subject, Teacher: teacher});
        Class.save()
            .then((result) => {
                console.log('A new Classroom has been created !');

                //api response
                res.status(200).json(result);
            })
            .catch((err) => {
                var error = handleError(err);
                console.log('An error has been made while creating a classroom.');

                //api response
                res.status(400).json(error);
            });
    }
    else{
        console.log('A student has tried to create a classroom.');
        res.status(400).json({response: 'You being a student, cannot create classrooms !'});
    }
};

const post_join = (req, res) => {
    const student = res.locals.student;
    if(student){
        const id = req.params.id;
        Classroom.findById(id)
            .then((result) => {
                if(result.Students.includes(student.id)){
                    console.log('Student is trying to join an already joined classroom.');
                    res.status(400).json({response: 'You have already joined the classroom.'});
                }
                else{
                    result.Students.push(student.id);
                    result.save()
                        .then((newresult) => {
                            console.log('A student has joined a classroom!');
                            res.status(200).json(newresult);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    else{
        console.log('A teacher has tried to join a classroom.');
        res.status(400).json({response: 'You being a teacher, cannot join classrooms !'});
    }
};


module.exports = {
    get_all,
    post_create,
    post_join
}
