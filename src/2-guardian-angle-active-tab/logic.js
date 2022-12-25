async function reportSite(url) {
  try {
    const response = await fetch("http://localhost:1111", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    return json;
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
