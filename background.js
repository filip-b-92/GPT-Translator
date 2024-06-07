let targetTabId;

// Create context menu item
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "send-info",
    title: "ChatGPT Translate",
    contexts: ["selection"],  // Only show when there is a selection
  });
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "send-info") {
    if (targetTabId) {
      chrome.tabs.sendMessage(targetTabId, {
        action: "receiveInfo",
        data: { text: info.selectionText }
      });
      console.log("Message sent successfully");
    } else {
      console.error("Target tab not set. Please make sure a tab with the title '=== Translate ===' is open.");
    }
  }
});

// Listen for messages from content scripts to set the target tab
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "setTargetTab") {
    targetTabId = sender.tab.id;
	}  	
});
