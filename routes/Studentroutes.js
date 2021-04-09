//Importing controllers and necessary auth verification middleware
const express = require('express');
const studentcontrollers = require('../controllers/Studentcontroller');
const studentrouter = express.Router();
const { reqAuth } = require('../Middleware/AuthMiddleware');


studentrouter.get('/signup', studentcontrollers.get_signup);

studentrouter.get('/login', studentcontrollers.get_login);

studentrouter.post('/signup', studentcontrollers.post_signup);

studentrouter.post('/login', studentcontrollers.post_login);

studentrouter.get('/logout', reqAuth, studentcontrollers.get_logout);

module.exports = studentrouter;