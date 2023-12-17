// alert("runs!");
$(document).ready(function () {
  console.log("--- Disassist Extension Loaded ---");
  chrome.storage.sync.get(null, (items) => {
    if (items?.font) {
      var fontFace = `
        @font-face {
          font-family: 'font-regular';
          src: url('${chrome.runtime.getURL("fonts/regular.woff")}') format('woff');
        }
      `;

      // Append style to the head of the current document
      $("head").append("<style>" + fontFace + "</style>");
      $("body").attr(
        "style",
        "font-family: 'font-regular', sans-serif !important;"
      );
    }

    chrome.storage.sync.onChanged.addListener(function (item) {
      // Used to connect settings changes with page
    });
  });
});
