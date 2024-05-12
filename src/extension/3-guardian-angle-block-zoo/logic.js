async function reportSite(url) {
  try {
    await fetch("https://localhost:1111", {
      method: "POST",
      body: JSON.stringify({ type: "report-site", url }),
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
      console.log("tab", tab);
      reportSite(tab.url);
    }
  );
}

document
  .getElementById("report-button")
  .addEventListener("click", reportActiveTab);
