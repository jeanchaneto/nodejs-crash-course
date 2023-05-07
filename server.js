const http = require("http");
const fs = require("fs");

//Create server
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  //Set routing path
  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      break;
    case "/about":
      path += "about.html";
      break;
    default:
      path += "404.html";
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
