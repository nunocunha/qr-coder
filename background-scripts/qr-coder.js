(!(typeof browser.extension.isAllowedFileSchemeAccess === "undefined")) && browser.extension.isAllowedFileSchemeAccess(function (isAllowedAccess) {
  if (isAllowedAccess) return;

  alert('Please allow access to file URLs on the following screen.');

  browser.tabs.create({
    url: 'chrome://extensions/?id=' + browser.runtime.id
  });
});

browser.contextMenus.create({
  id: "qr-coder-selection",
  title: "Generate a QR Code for this selection",
  contexts: ['selection']
});

browser.contextMenus.create({
  id: "qr-coder-link",
  title: "Generate a QR Code for this link",
  contexts: ['link']
});

browser.contextMenus.create({
  id: "qr-coder-page",
  title: "Generate a QR Code for this page",
  contexts: ['page']
});

browser.contextMenus.create({
  id: "qr-coder-image",
  title: "Generate a QR Code for this image",
  contexts: ['image']
});

browser.contextMenus.create({
  id: "qr-coder-audio",
  title: "Generate a QR Code for this sound",
  contexts: ['audio']
});

browser.contextMenus.create({
  id: "qr-coder-video",
  title: "Generate a QR Code for this video",
  contexts: ['video']
});

browser.contextMenus.create({
  id: "qr-coder-frame",
  title: "Generate a QR Code for this frame",
  contexts: ['frame']
});

browser.contextMenus.onClicked.addListener(function (info, tab) {
  var code;

  switch (info.menuItemId) {
    case "qr-coder-selection":
      code = "QRCoder.showOverlay('', true);";
      break;
    case "qr-coder-page":
      code = "QRCoder.showOverlay('" + window.btoa(info.pageUrl) + "', false);";
      break;
    case "qr-coder-link":
      code = "QRCoder.showOverlay('" + window.btoa(info.linkUrl) + "', false);";
      break;
    case "qr-coder-image":
    case "qr-coder-audio":
    case "qr-coder-video":
      code = "QRCoder.showOverlay('" + window.btoa(info.srcUrl) + "', false);";
      break;
    case "qr-coder-frame":
      code = "QRCoder.showOverlay('" + window.btoa(info.frameUrl) + "', false);";
      break;
  }

  browser.tabs.executeScript(tab.id, { code: code });
});