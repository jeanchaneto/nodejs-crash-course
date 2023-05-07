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
