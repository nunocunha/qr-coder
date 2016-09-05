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

chrome.contextMenus.create({
  id: "qr-coder-image",
  title: "Generate a QR Code for this image",
  contexts: ['image']
});

chrome.contextMenus.create({
  id: "qr-coder-audio",
  title: "Generate a QR Code for this sound",
  contexts: ['audio']
});

chrome.contextMenus.create({
  id: "qr-coder-video",
  title: "Generate a QR Code for this video",
  contexts: ['video']
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
    case "qr-coder-image":
    case "qr-coder-audio":
    case "qr-coder-video":
      chrome.tabs.executeScript(tab.id, { code: "QRCoder.showOverlay('" + info.srcUrl + "');" });
      break;
  }
});