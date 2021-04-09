const express = require('express');
const Blog = require('../models/Blog.js');


// NOTE-THAT : Below is the normal get request which acquires data from db server and reloads page to render.
//             Linked below is an implementation of same task using XML requestAnimationFrame, without JQuery,whose client js file is linked below:
// LINK ../assets/js/mongo-get.js
// FIX-THIS : //! Above linked asynchronous xml works perfect, but with presence of middleware reqAuth, it doesnt work ! why ?

const getallblogs = function(req, res){
    Blog.find()
        .then((result) => {
            console.log('blog data is fetched from mongo using jquery');
            res.render('home', {blogs : result});
        }).catch((err) => {
            console.error(err);
        });
}; 

const getablog = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            console.log(`Blog data with id ${id} is fetched.`);
            res.render('blog', {blog : result})
        }).catch((err) => {
            console.error(err);
        });
};

const postblog = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            console.log('New blog is saved');
            res.redirect('/');
        }).catch((err) => {
            console.error(err);
        });
};

const deleteblog = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            console.log(`Blog data with id ${id} is deleted by using jquery`);
            res.json({redirect: '/blog/all'});
        })
        .catch((err) => {
            console.error(err);
        });
};

module.exports = {
    getallblogs,
    getablog,
    postblog,
    deleteblog,
}