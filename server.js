const http = require("http");
const fs = require("fs");
const _ = require('lodash');

//Create server
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  //lodash
  const randomNumber = _.random(0,20);
  console.log(randomNumber);

  //Set routing path
  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    //Redirect
    case "/about-me":
      res.setHeader("Location", "/about");
      res.statusCode = 301;
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  //Set header content type
  res.setHeader("content-type", "text/html");

  //   //Write response
  //   res.write("<h1>Response Title</h1>");
  //   res.write("<p>HTML response</p>");
  //   //Send response to brower
  //   res.end();

  //send an html file as response
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      // res.write(data);
      // If used once can put data in res.end()
      res.end(data);
    }
  });
});

//Listen to http requests
server.listen(3000, "localhost", () => {
  console.log("listening to request on port 3000");
});
