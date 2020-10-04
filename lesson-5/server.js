const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log("request made");
  console.log(req.url, req.method);

  // set header content type
  res.setHeader("Content-Type", "text/html");
  // res.write(`<head><link rel="stylesheet" href="#"></head>`);
  // res.write("<p>hello, world</p>");
  // res.write("<p>hello, world 2</p>");
  // res.end();

  let path = `./views/`;
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  //send an html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.error(err);
      res.end();
    } else {
      // console.log(data);
      // res.write(data);
      // res.end();
      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("listening for requests on port 3000");
});
