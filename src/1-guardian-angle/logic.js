async function reportSite() {
  try {
    const url = "foo.com";
    await fetch("https://localhost:1111", {
      method: "POST",
      body: JSON.stringify({ url }),
    });
  } catch (err) {
    console.error(err);
  }
}

document.getElementById("report-button").addEventListener("click", reportSite);
