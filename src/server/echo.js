// https://gist.github.com/bszwej/62c327d773051816ed4949fd40c82c74
const http = require("http");
const server = http.createServer();

server
  .on("request", (request, response) => {
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
  })
  .listen(1111);
