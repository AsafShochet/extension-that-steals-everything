function init() {
  const url = window.location.href;
  if (url.includes("zoo.org")) {
    document.body.innerHTML =
      '<div style="margin-top: 100px; font-family: \'Lato\'; font-size: 25px;"><center><h1>This site has been blocked by Guardian Angel</h1><img style="margin-top: 10px" height="400px" src="https://i.giphy.com/w89ak63KNl0nJl80ig.webp"><div style="font-size:20px;margin-top:20px;">Now go somewhere else!</div></center></div>';
  }
}

init();
