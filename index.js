var http = require("http");
var url = require("url");
var fs = require("fs");

http
  .createServer(function (req, res) {
    const q = url.parse(req.url, true);
    let filePath = q.pathname === "/" ? "/index.html" : q.pathname;
    try {
      fs.readFile(`.${filePath}`, function (err, data) {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/html" });
          fs.readFile("./404.html", "utf8", (err, errorPage) => {
            if (err) {
              console.error(err);
              res.end("404 Not Found");
            } else {
              res.end(errorPage);
            }
          });
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        }
      });
    } catch (err) {
      console.log(err);
    }
  })
  .listen(8080);
