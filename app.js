//Environement variable setup
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

//Require mongoose
const mongoose = require("mongoose");

//Import models
const Blog = require("./models/blog");

const app = express();


//Connect to MongoDB
const dbURI = process.env.MONGODB_URI;
//Async function
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//Register view engine
app.set("view engine", "ejs");
//if views in differetn folder than views:
//app.set('views', 'CUSTOM_VIEW_FOLDER_NAME')

//Listen for request only; after connection to db so moved to mongoose.connect
// app.listen(3000);

//Middleware/ must use next() to move on otherwise server hangs
app.use((req, res, next) => {
  console.log(req.hostname);
  next();
});

app.use(morgan("dev"));

//Middleware & static files
app.use(express.static("./public"));
//Middleware to parse post form url data
app.use(express.urlencoded({ extended: true}));

// //*********Mongoose and monogdb sandbox routes**********
// //Save doc to database
// app.get('/add-blog', (req, res) => {
//   //Use model to create new instance of a blog doc
//   const blog = new Blog({
//     title: 'new blog text',
//     snippet: 'Sick blog',
//     body: 'blablablablablablablablablablablablablablablablablablablablablablablablabla'
//   })

//   blog.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err));
// })

// //Get docs from databse
// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err));
// })

// //Get single doc
// app.get('/single-blog', (req, res) => {
//   Blog.findById('6458bfa7bee40f6820aa436d')
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))
// })

// ********************ROUTES************************
//Respond to request
app.get("/", (req, res) => {
  //Response automatically sets the header and status code

  // res.send('<p>EXPRESS</p>')
  //   res.sendFile("/views/index.html", { root: __dirname });

  // View engine response
  res.render("index", { message: "Dynamic ejs message" });
});

app.get("/blogs", (req, res) => {
  //get blogs and sort from newest to oldest 
  Blog.find().sort({createdAt: -1})
    .then((result) => {
      //render and pass in data
      res.render("blogs", { blogs: result });
    })
    .catch((err) => console.log(err));
});

//Handle blog post form
app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => console.log(err));
})

//Handle url parameters
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("singleBlog", { blog: result} )
    })
    .catch((err) => console.log(err));
})

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
  //Note when using AJAX request we cannot redirect with node.js so wen send json object instead
    .then((result) => {
      res.json({redirect: '/blogs'})
    })
    .catch((err) => console.log(err));
})

app.get("/about", (req, res) => {
  //Response automatically sets the header and status code

  //looks for absolute path so specify root as 2nd argument
  //   res.sendFile("./views/about.html", { root: __dirname });

  res.render("about");
});

app.get("/blog/create", (req, res) => {
  res.render("create");
});

//redirect
app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

//404 located last as express reads top to bottom
app.use((req, res) => {
  //   res.status(404).sendFile("./views/404.html", { root: __dirname });

  res.render("404");
});
