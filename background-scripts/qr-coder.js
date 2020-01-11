var crossBrowser = crossBrowser ||
  (typeof chrome === "object" && chrome.hasOwnProperty("extension") ?
    chrome : browser);

var QRCoderState = {
  showingTabs: [],
};

crossBrowser.contextMenus.createQRCoder = function () {
  crossBrowser.contextMenus.create({
    id: "qr-coder-selection",
    title: "Generate QR Code for selection",
    contexts: ['selection']
  });

  crossBrowser.contextMenus.create({
    id: "qr-coder-link",
    title: "Generate QR Code for link",
    contexts: ['link']
  });

  crossBrowser.contextMenus.create({
    id: "qr-coder-page",
    title: "Generate QR Code for page",
    contexts: ['page']
  });

  crossBrowser.contextMenus.create({
    id: "qr-coder-image",
    title: "Generate QR Code for image",
    contexts: ['image']
  });

  crossBrowser.contextMenus.create({
    id: "qr-coder-audio",
    title: "Generate QR Code for audio",
    contexts: ['audio']
  });

  crossBrowser.contextMenus.create({
    id: "qr-coder-video",
    title: "Generate QR Code for video",
    contexts: ['video']
  });

  crossBrowser.contextMenus.create({
    id: "qr-coder-frame",
    title: "Generate QR Code for frame",
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
  QRCoderState.showingTabs[sender.tab.id] = request.isShowing;

  crossBrowser.contextMenus.updateQRCoder(request.isShowing);
});

crossBrowser.tabs.onActivated.addListener(function (activeInfo) {
  crossBrowser.contextMenus.updateQRCoder(QRCoderState.showingTabs[activeInfo.tabId]);
});

crossBrowser.contextMenus.updateQRCoder = function (isShowing) {
  if(isShowing) {
    crossBrowser.contextMenus.removeAll();
  } else {
    crossBrowser.contextMenus.createQRCoder();
  }
};
