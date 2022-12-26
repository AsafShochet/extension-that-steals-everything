// https://gist.github.com/bszwej/62c327d773051816ed4949fd40c82c74
// SSL based on https://dev.to/josuebustos/https-localhost-for-node-js-1p1k
const http = require("http");
const fs = require("fs");

const options = {
  key: fs.readFileSync("src/server/localhost-key.pem"),
  cert: fs.readFileSync("src/server/localhost.pem"),
};

const app = function (request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  response.setHeader("Access-Control-Max-Age", 2592000); // 30 days
  let body = [];
  request
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();

      console.log(`==== ${request.method} ${request.url}`);
      // console.log("> Headers");
      // console.log(request.headers);

      console.log("> Body");
      console.log(body);
      response.end();
    });
};

const server = http.createServer(options, app).listen(1111);
