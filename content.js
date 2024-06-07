// console.log("Content script loaded");

if (document.title === "ChatGPT") {
  setTimeout(() => {
    // console.log("after waiting", document.title);
    if (document.title === "=== Translate ===") {
      chrome.runtime.sendMessage({ action: "setTargetTab" });
      console.log(`This tab is set as the target: ${document.title}`);
    }
  }, 1400);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // console.log("Message received in content script:", message);
  if (message.action === "receiveInfo") {
    // console.log(`Received info from another tab: ${message.data.text}`);
    // Display the received info on the page
		const textarea = document.getElementById("prompt-textarea");
  
    textarea.value = message.data.text;

    const inputEvent = new Event('input', {
      bubbles: true,
      cancelable: true
    });
    textarea.dispatchEvent(inputEvent);

		for (let child of textarea.parentNode.parentNode.children) {
		  if (child.tagName.toLowerCase() === 'button') {
		    child.click()
		    break;
		  }
		}


  }
});
