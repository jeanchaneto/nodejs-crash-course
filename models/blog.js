const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//1 Create A schema
// Schema constructor with timestamp added on creation
// Schema defines the structure of the document

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true});

//2 Create a model
//The Model surrounds the Schema and provides an interface to interact with the Schema

//Will automatically look for Blogs (add s to arg) collection
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;