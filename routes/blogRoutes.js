const express = require("express");
const router = express.Router();

//Import models
const Blog = require("../models/blog");

router.get("/", (req, res) => {
  //get blogs and sort from newest to oldest
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      //render and pass in data
      res.render("blogs", { blogs: result });
    })
    .catch((err) => console.log(err));
});

//Handle blog post form
router.post("/", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => console.log(err));
});

router.get("/blog/create", (req, res) => {
  res.render("create");
});

//Handle url parameters
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("singleBlog", { blog: result });
    })
    .catch((err) => console.log(err));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    //Note when using AJAX request we cannot redirect with node.js so wen send json object instead
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
