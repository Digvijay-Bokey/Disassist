$(document).ready(function () {
  chrome.contextMenus.removeAll(function () {
    chrome.contextMenus.create({
      id: "manipulateText",
      title: "AI Read Assist",
      contexts: ["selection"],
    });
  });
  chrome.storage.sync.get(null, (items) => {
    var keys = Object.keys(items);
    if (keys.length != 4) {
      // Not setup
      $("input").each(function () {
        var field = $(this).attr("id");
        console.log(field);
        items[field] = true;
        chrome.storage.sync.set(items);
      });
    }
    for (item in items) {
      $(`input#${item}`).prop("checked", items[item]);
    }
  });
});

$("input").on("click", function () {
  var field = $(this).attr("id");
  var checked = $(this).prop("checked");

  chrome.storage.sync.set({ [field]: checked });
});

$(".readtextbtn").on("click", function () {
  console.log("btn clicked");
  chrome.runtime.sendMessage({ greeting: "hi" });
});

// chrome.contextMenus.onClicked.addListener(function (info, tab) {
//   if (info.menuItemId === "manipulateText") {
//     // Send a message to the content script to manipulate the selected text
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, { action: "manipulateText" });
//     });
//   }
// });
