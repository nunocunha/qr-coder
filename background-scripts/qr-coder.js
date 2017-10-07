var crossBrowser = crossBrowser ||
  (typeof chrome === "object" && chrome.hasOwnProperty("extension") ?
    chrome : browser);

crossBrowser.contextMenus.createQRCoder = function () {
  crossBrowser.contextMenus.create({
    id: "qr-coder-selection",
    title: "Generate a QR Code for this selection",
    contexts: ['selection']
  });

  crossBrowser.contextMenus.create({
    id: "qr-coder-link",
    title: "Generate a QR Code for this link",
    contexts: ['link']
  });

  crossBrowser.contextMenus.create({
    id: "qr-coder-page",
    title: "Generate a QR Code for this page",
    contexts: ['page']
  });

  crossBrowser.contextMenus.create({
    id: "qr-coder-image",
    title: "Generate a QR Code for this image",
    contexts: ['image']
  });

  crossBrowser.contextMenus.create({
    id: "qr-coder-audio",
    title: "Generate a QR Code for this sound",
    contexts: ['audio']
  });

  crossBrowser.contextMenus.create({
    id: "qr-coder-video",
    title: "Generate a QR Code for this video",
    contexts: ['video']
  });

  crossBrowser.contextMenus.create({
    id: "qr-coder-frame",
    title: "Generate a QR Code for this frame",
    contexts: ['frame']
  });
};

crossBrowser.contextMenus.createQRCoder();

crossBrowser.contextMenus.onClicked.addListener(function (info, tab) {
  var data = "";
  var isDataFromSelection = false;

  switch (info.menuItemId) {
    case "qr-coder-selection":
      isDataFromSelection = true;
      break;
    case "qr-coder-page":
      data = info.pageUrl;
      break;
    case "qr-coder-link":
      data = info.linkUrl;
      break;
    case "qr-coder-image":
    case "qr-coder-audio":
    case "qr-coder-video":
      data = info.srcUrl;
      break;
    case "qr-coder-frame":
      data = info.frameUrl;
      break;
  }

  crossBrowser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    crossBrowser.tabs.sendMessage(tabs[0].id, { data: data, isDataFromSelection: isDataFromSelection });
  });
});

crossBrowser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.isShowing) {
    crossBrowser.contextMenus.removeAll();
  } else {
    crossBrowser.contextMenus.createQRCoder();
  }
});