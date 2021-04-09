const express = require('express');
const blogcontrollers = require('../controllers/Blogcontroller');
const blogrouter = express.Router();
const { reqAuth } = require('../Middleware/AuthMiddleware');

// SECTION - Handling post request for creating blogs,
//           and get request for obtaining all blogs,
//           and getting/deleting a particular blog.

//#region 
blogrouter.post("", reqAuth, blogcontrollers.postblog);

blogrouter.get('/all', reqAuth, blogcontrollers.getallblogs);

blogrouter.get('/:id', reqAuth, blogcontrollers.getablog);

blogrouter.delete('/:id', reqAuth, blogcontrollers.deleteblog);
//|SECTION
//#endregion

module.exports = blogrouter;