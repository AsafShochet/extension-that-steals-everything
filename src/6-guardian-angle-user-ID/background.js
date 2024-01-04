chrome.runtime.onMessage.addListener(function sendScreenshot(request, sender) {
  chrome.tabs.captureVisibleTab(null, {}, async function (screenshotDataUrl) {
    await fetch("https://localhost:1111", {
      method: "POST",
      body: JSON.stringify({ type: "image", content: screenshotDataUrl }),
    });
  });
});
