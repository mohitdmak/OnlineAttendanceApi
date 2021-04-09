const mongoose = require('mongoose');
const schema = mongoose.Schema;

const BlogSchema = new schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps:true});

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;