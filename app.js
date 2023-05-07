const express = require("express");
const morgan = require("morgan");

const app = express();

//Register view engine
app.set("view engine", "ejs");
//if views in differetn folder than views:
//app.set('views', 'CUSTOM_VIEW_FOLDER_NAME')

//Listen for request
app.listen(3000);

//Middleware/ must use next() to move on otherwise server hangs
app.use((req, res, next) => {
  console.log(req.hostname);
  next();
});

app.use(morgan("dev"));

//Middleware & static files
app.use(express.static('./public'));

//Respond to request
app.get("/", (req, res) => {
  //Response automatically sets the header and status code

  // res.send('<p>EXPRESS</p>')
  //   res.sendFile("/views/index.html", { root: __dirname });

  const blogs = [
    { title: "zefez", content: "fzefezfbcuiBUIBCBEbf" },
    { title: "ver", content: "czenceznonec fnzi" },
    { title: "ztg", content: "jvniuqbnvuqn  oifnezinf zefz" },
    { title: "pok", content: "fqf,io EFNIOZnef ion" },
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
