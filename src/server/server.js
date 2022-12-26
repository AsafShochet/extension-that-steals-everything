const https = require("https");
const fs = require("fs");
const options = {
  key: fs.readFileSync("localhost-key.pem"),
  cert: fs.readFileSync("localhost.pem"),
};
https
  .createServer(options, function (request, response) {
    // server code
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
        console.log(body);
        response.end();
      });
  })
  .listen(1111);
