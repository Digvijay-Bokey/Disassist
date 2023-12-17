$(document).ready(function () {
  console.log("--- Disassist Extension Loaded ---");
  chrome.storage.sync.get(null, (items) => {
    var styles = `
        @font-face {
          font-family: 'font-regular';
          src: url('${chrome.runtime.getURL(
            "fonts/regular.woff"
          )}') format('woff');
        }

        .text-dialog {
            position: absolute;
            background-color: #333;
            color: #fff;
            border: 1px solid #555;
            padding: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 9999;
          }
      `;

    // Append style to the head of the current document
    $("head").append("<style>" + styles + "</style>");
    if (items?.font) {
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

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  console.log(request);
  if (request.action === "manipulateText") {
    await manipulateText();
  }
});

async function manipulateText() {
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();

  // Manipulate the selected text
  //   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //     chrome.tabs.sendMessage(tabs[0].id, { action: "manipulateText" });
  //   });
  const manipulatedText = await OpenAIFetchAPI(selectedText);

  // Create a div for the dialog
  const dialog = document.createElement("div");
  dialog.className = "text-dialog";
  dialog.textContent = "Manipulated Text: " + manipulatedText;

  // Calculate the position for the dialog
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  // Calculate the position relative to the entire document
  const documentRect = document.body.getBoundingClientRect();
  const dialogTop = rect.top - documentRect.top - dialog.offsetHeight - 10;

  dialog.style.position = "absolute";
  dialog.style.top = dialogTop + "px";
  dialog.style.left = rect.left + rect.width / 2 - dialog.offsetWidth + "px";

  // Append the dialog to the body
  document.body.appendChild(dialog);

  // Add a click event listener to remove the dialog on clicks outside of it
  document.addEventListener("click", handleClickOutside);

  // Function to handle click events
  function handleClickOutside(event) {
    if (!dialog.contains(event.target)) {
      // Click outside the dialog, remove the dialog and remove the event listener
      document.body.removeChild(dialog);
      document.removeEventListener("click", handleClickOutside);
    }
  }
}
