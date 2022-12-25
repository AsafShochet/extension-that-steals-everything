async function reportSite() {
  try {
    const url = "foo.com";
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

document.getElementById("report-button").addEventListener("click", reportSite);
