// Importing Teacher model and jwt string and bcrypt for password verification.
const express = require('express');
const Classroom = require('../models/Classroom');
const Student = require('../models/Student');
const jwt = require('jsonwebtoken');

// Importing dependancies for QRCODE.
const genQR = require('qrcode');

// error handling to determine the exact error user made in filling form of
// auth.
function handleError(err) {

  //* We cannot fill an error message with [true,''] for the 'unique' field in
  //the schema like we did for other fields, thus seperate handling is required
  //for it using err.code .
  if (err.code === 11000) {
    err = 'An account with this email id already exists.';
  }

  return err;
}

//* ALL CONTROLLER FUNCTIONS.

const get_all = (req, res) => {
  Classroom.find()
      .then((result) => {
        console.log('Data for all classrooms has been fetched.');

        // api response
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(502).json({
          response :
              'An error has occured while finding data of the classrooms.'
        });
      });
};

const post_create = (req, res) => {
  const teacher = res.locals.teacher;
  if (teacher) {

    const subject = req.body.Subject;
    Class = new Classroom({Subject : subject, Teacher : teacher});
    Class.save()
        .then((result) => {
          console.log('A new Classroom has been created !');

          // api response
          res.status(200).json(result);
        })
        .catch((err) => {
          var error = handleError(err);
          console.log('An error has been made while creating a classroom.');

          // api response
          res.status(400).json(error);
        });
  } else {
    console.log('A student has tried to create a classroom.');
    res.status(400).json(
        {response : 'You being a student, cannot create classrooms !'});
  }
};

const post_join = (req, res) => {
  const student = res.locals.student;
  if (student) {
    const id = req.params.id;
    Classroom.findById(id)
        .then((result) => {
          if (result) {
            if (result.Students.includes(student.id)) {
              console.log(
                  'Student is trying to join an already joined classroom.');
              res.status(400).json(
                  {response : 'You have already joined the classroom.'});
            } else {
              result.Students.push(student.id);
              result.save()
                  .then((newresult) => {
                    console.log('A student has joined a classroom!');
                    res.status(200).json(newresult);
                  })
                  .catch((err) => {
                    console.log(err);
                    res.status(502).json({
                      response :
                          'An error has occured while joining you to the classroom.'
                    });
                  });
            }
          } else {
            console.log(
                'A student has tried to join a non-existent classroom.');
            res.status(400).json({
              response : 'The classroom you are trying to join does not exist !'
            });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(502).json({
            response :
                'An error has occured while finding the required classroom.'
          });
        });
  } else {
    console.log('A teacher has tried to join a classroom.');
    res.status(400).json(
        {response : 'You being a teacher, cannot join classrooms !'});
  }
};

const post_attend = (req, res) => {
  id = req.body.qrdata;
  classid = req.params.id;
  Classroom.findById(classid)
      .then((result) => {
        if (result) {
          if (result.Students.includes(id)) {
            console.log('Student is attending a class.');
            res.status(200).json(
                {response : 'You can now attend your class !!!'});
          } else {
            console.log('Student is not allowed to attend the class.');
            res.status(400).json(
                {response : 'You must first join this class to attend !!!'});
          }
        } else {
          console.log('Student has tried to attend a non-existant classroom.');
          res.status(400).json({
            response : 'The class you are trying to attend does not exist.'
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(502).json(
            {response : 'An error has occured while attending the class.'});
      });
};

const get_qr = (req, res) => {
  const student = res.locals.student;
  if (student) {
    const data = student._id;
    const stringdata = JSON.stringify(data);
    genQR.toString(stringdata, function(err, code) {
      if (err) {
        console.log(err);
        res.status(200).json(
            {response : 'An error has occured while creating your qr code.'});
      }

      console.log(code);
      Student.updateOne({_id : student.id}, {QR : code})
          .then((result) => {
            console.log(
                'A qr code is generated and saved to the profile of the student');
            res.status(200).json({
              response : 'Congrats! Your QR code has been generated !',
              QR : code,
              Student : result
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({
              response :
                  'An error has occured while saving your QR code to your profile.'
            });
          });
    });
  } else {
    console.log('A teacher has tried to generate a qr code.');
    res.status(400).json({
      response : 'Being a teacher, you cannot generate a qr code for yourself!'
    });
  }
};

module.exports = {
  get_all,
  post_create,
  post_join,
  post_attend,
  get_qr
}
