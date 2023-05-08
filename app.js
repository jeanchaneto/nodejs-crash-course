//Environement variable setup
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const blogRoutes = require("./routes/blogRoutes");


//Require mongoose
const mongoose = require("mongoose");

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
app.use(express.urlencoded({ extended: true }));

// ********************ROUTES************************
//Respond to request
app.get("/", (req, res) => {
  //Response automatically sets the header and status code

  // res.send('<p>EXPRESS</p>')
  //   res.sendFile("/views/index.html", { root: __dirname });

  // View engine response
  res.render("index", { message: "Dynamic ejs message" });
});

//scope to one url
app.use("/blogs/", blogRoutes);

app.get("/about", (req, res) => {
  //Response automatically sets the header and status code

  //looks for absolute path so specify root as 2nd argument
  //   res.sendFile("./views/about.html", { root: __dirname });

  res.render("about");
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
