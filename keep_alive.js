const http = require("http");

function keepAlive() {
  http
    .createServer((req, res) => {
      res.write("I am alive");
      res.end();
    })
    .listen(8080);
}

module.exports = keepAlive;
