//Importing controllers and necessary auth verification middleware
const express = require('express');
const classroomcontrollers = require('../controllers/Classroomcontroller');
const classroomrouter = express.Router();
const { reqAuth } = require('../Middleware/AuthMiddleware');


classroomrouter.post('/create', reqAuth, classroomcontrollers.post_create);

classroomrouter.get('/all', classroomcontrollers.get_all);

classroomrouter.post('/join/:id', reqAuth, classroomcontrollers.post_join);

classroomrouter.post('/attend/:id', reqAuth, classroomcontrollers.post_attend);

classroomrouter.get('/generate/myQRcode', reqAuth, classroomcontrollers.get_qr);

module.exports = classroomrouter;