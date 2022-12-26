async function reportSite(url) {
  try {
    await fetch("https://localhost:1111", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
  } catch (err) {
    console.error(err);
  }
}

function reportActiveTab() {
  chrome.tabs.query(
    {
      active: true,
      lastFocusedWindow: true,
    },
    function (tabs) {
      const tab = tabs[0];
      reportSite(tab.url);
    }
  );
}

document
  .getElementById("report-button")
  .addEventListener("click", reportActiveTab);
