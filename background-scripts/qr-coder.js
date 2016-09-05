chrome.contextMenus.create({
  id: "qr-coder-selection",
  title: "Generate a QR Code for this selection",
  contexts: ['selection']
});

chrome.contextMenus.create({
  id: "qr-coder-link",
  title: "Generate a QR Code for this link",
  contexts: ['link']
});

chrome.contextMenus.create({
  id: "qr-coder-page",
  title: "Generate a QR Code for this page",
  contexts: ['page']
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  switch (info.menuItemId) {
    case "qr-coder-selection":
      chrome.tabs.executeScript(tab.id, { code: "QRCoder.showOverlay('" + info.selectionText + "');" });
      break;
    case "qr-coder-page":
      chrome.tabs.executeScript(tab.id, { code: "QRCoder.showOverlay('" + info.pageUrl + "');" });
      break;
    case "qr-coder-link":
      chrome.tabs.executeScript(tab.id, { code: "QRCoder.showOverlay('" + info.linkUrl + "');" });
      break;
  }
});