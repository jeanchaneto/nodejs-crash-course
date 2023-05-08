//Environement variable setup
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

//Require mongoose
const mongoose = require("mongoose");

//Import models
const Blog = require('./models/blog');

const app = express();

//Connect to MongoDB
const dbURI = process.env.MONGODB_URI;
//Async function
mongoose.connect(dbURI)
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



//*********Mongoose and monogdb sandbox routes**********
//Save doc to database
app.get('/add-blog', (req, res) => {
  //Use model to create new instance of a blog doc
  const blog = new Blog({
    title: 'new blog text',
    snippet: 'Sick blog',
    body: 'blablablablablablablablablablablablablablablablablablablablablablablablabla'
  })
  
  blog.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => console.log(err));
})

//Get docs from databse
app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => console.log(err));
})

//Get single doc
app.get('/single-blog', (req, res) => {
  Blog.findById('6458bfa7bee40f6820aa436d')
    .then((result) => {
      res.send(result)
    })
    .catch((err) => console.log(err))
})


//Respond to request
app.get("/", (req, res) => {
  //Response automatically sets the header and status code

  // res.send('<p>EXPRESS</p>')
  //   res.sendFile("/views/index.html", { root: __dirname });

  const blogs = [
    { title: "zefez", body: "fzefezfbcuiBUIBCBEbf" },
    { title: "ver", body: "czenceznonec fnzi" },
    { title: "ztg", body: "jvniuqbnvuqn  oifnezinf zefz" },
    { title: "pok", body: "fqf,io EFNIOZnef ion" },
  ];

  // View engine response
  res.render("index", { message: "Dynamic ejs message", blogs: blogs });
});

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
