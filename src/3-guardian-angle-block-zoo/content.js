function blockBlackListedSite() {
  if (window.location.href.includes("zoo.org")) {
    document.body.innerHTML =
      '<div><center><h1 style="font-size: 50px;">This site has been blocked</h1><img height="400px" src="https://openai-labs-public-images-prod.azureedge.net/user-R6IAhb5TVYu3MNFn7i60xp14/generations/generation-y341cFvw7Ccw8GFqQpquwcN3/image.webp"></center></div>';
  }
}

blockBlackListedSite();
