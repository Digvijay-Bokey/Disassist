const { OpenAIFetchAPI } = require("./AiHelper.js");

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  console.log("triggered");
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "manipulateText" });
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request);
    if (request.action === "fetchGPT") {
      manipulateText();
    }
  });