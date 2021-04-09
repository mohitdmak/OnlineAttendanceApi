//Importing controllers and necessary auth verification middleware
const express = require('express');
const teachercontrollers = require('../controllers/Teachercontroller');
const teacherrouter = express.Router();
const { reqAuth } = require('../Middleware/AuthMiddleware');


teacherrouter.get('/signup', teachercontrollers.get_signup);

teacherrouter.get('/login', teachercontrollers.get_login);

teacherrouter.post('/signup', teachercontrollers.post_signup);

teacherrouter.post('/login', teachercontrollers.post_login);

teacherrouter.get('/logout', reqAuth, teachercontrollers.get_logout);

module.exports = teacherrouter;