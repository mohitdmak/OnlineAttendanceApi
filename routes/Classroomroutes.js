//Importing controllers and necessary auth verification middleware
const express = require('express');
const classroomcontrollers = require('../controllers/Classroomcontroller');
const classroomrouter = express.Router();
const { reqAuth } = require('../Middleware/AuthMiddleware');


classroomrouter.post('/create', reqAuth, classroomcontrollers.post_create);

classroomrouter.get('/all', classroomcontrollers.get_all);

classroomrouter.post('/join/:id', classroomcontrollers.post_join);

//classroomrouter.post('/', classroomcontrollers.post_login);

//classroomrouter.get('/logout', reqAuth, classroomcontrollers.get_logout);

module.exports = classroomrouter;