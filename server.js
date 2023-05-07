const http = require("http");

//Create server
const server = http.createServer((req, res) => {
  
    console.log(req.url, req.method);

  //Set header content type
  res.setHeader("content-type", "text/html");
  //Write response
  res.write("<h1>Response Title</h1>");
  res.write("<p>HTML response</p>");
  //Send response to brower
  res.end();
});

//Listen to http requests
server.listen(3000, "localhost", () => {
  console.log("listening to request on port 3000");
});
