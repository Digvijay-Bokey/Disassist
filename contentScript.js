// alert("runs!");
$(document).ready(function () {
  console.log("--- Disassist Extension Loaded ---");
  var fontFace = `
  @font-face {
    font-family: 'font-regular';
    src: url('${chrome.runtime.getURL("regular.woff")}') format('woff');
  }
`;

  // Append style to the head of the current document
  $("head").append("<style>" + fontFace + "</style>");
  $("body").attr("style", "font-family: 'font-regular', sans-serif !important");
});
