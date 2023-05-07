const express = require("express");

const app = express();

//Listen for request
app.listen(3000);

//Respond to request
app.get("/", (req, res) => {
  //Response automatically sets the header and status code
  // res.send('<p>EXPRESS</p>')
  res.sendFile("/views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  //Response automatically sets the header and status code
  //looks for absolute path so specify root as 2nd argument
  res.sendFile("./views/about.html", { root: __dirname });
});

//redirect
app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

//404 located last as express reads top to bottom
app.use((req, res) => {
    res.status(404).sendFile("./views/404.html", { root: __dirname });
}
);
