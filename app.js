// Initiating express app
const express = require('express');
const app = express();

//* MIDDLEWARE :

// this parses data submitted through forms generally.
app.use(express.urlencoded({extended : true}));
// this parses data submitted in json format.
app.use(express.json());
// setting up cookie parser.
const cookieParser = require('cookie-parser');
// needed to parse cookie data wherever processed.
app.use(cookieParser());
// Using custom middleware for Checking and making available the Logged User for
// all get requests, and thus for all views.
const {checkLoggedStudent} = require('./Middleware/loggedStudent');
const {checkLoggedTeacher} = require('./Middleware/loggedTeacher');

//* This middleware will check for a logged in user and store user details as a
//variable in 'locals' of response.
//* We are placing it above all middlewares by applying it to all get requests,
//thus any further middleware can check the status of user through the stored
//variable in locals.
app.get('*', checkLoggedTeacher, checkLoggedStudent);
app.post('*', checkLoggedTeacher, checkLoggedStudent);

/*
const Blogroutes = require('./routes/blogroutes');
app.use('/blog', Blogroutes);
*/

//* Routing all Teacher paths
const Teacherroutes = require('./routes/Teacherroutes');
app.use('/teacher', Teacherroutes);

//* Routing all Student paths
const Studentroutes = require('./routes/Studentroutes');
app.use('/student', Studentroutes);

//* Routing all Classroom paths
const Classroomroutes = require('./routes/Classroomroutes');
app.use('/classroom', Classroomroutes);

//* Home page get request
app.get('/', function(req, res) {
  console.log('The user has arrived at home page');
  res.status(200).json({response : 'Hey! welcome to the Online College !'});
});

// Exporting express app for use in server
module.exports = app;