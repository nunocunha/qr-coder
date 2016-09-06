var QRCoder = QRCoder || {};

QRCoder.maxSize = 40;

QRCoder.showOverlay = function (base64, getFromSelection) {
  var data = (typeof getFromSelection === "boolean" && getFromSelection) ? window.getSelection().toString() : window.atob(base64);
  var size = 1;

  do {
    try {
      var qr = qrcode(size, "L");
      qr.addData(data);
      qr.make();
      var imgCode = this.createElementFromHTML(qr.createImgTag(4));
      threwException = false;
    } catch (error) {
      size++;
      threwException = true;
    }
  } while (threwException && size <= this.maxSize);

  if (size <= this.maxSize) {
    var divShader = document.body.appendChild(document.createElement("div"));
    divShader.style.position = "fixed";
    divShader.style.top = "0";
    divShader.style.left = "0";
    divShader.style.right = "0";
    divShader.style.bottom = "0";
    divShader.style.backgroundColor = "rgba(0, 0, 0, 0.33)";
    divShader.style.zIndex = "10000000";
    divShader.addEventListener("click", function (event) {
      divShader.deleteSelf();
    }, false);
    
    var divAlign = divShader.appendChild(document.createElement("div"));
    divAlign.style.position = "absolute";
    divAlign.style.top = "50%";
    divAlign.style.left = "50%";
    divAlign.style.transform = "translate(-50%, -50%)";
    
    imgCode = divAlign.appendChild(imgCode.childNodes[0]);
    imgCode.style.display = "block";

    if (size > 12) {
      var divWarning = divAlign.appendChild(document.createElement("div"));
      divWarning.appendChild(document.createTextNode("If you're having trouble scanning the QR code, try generating one with less information."));
      divWarning.style.backgroundColor = "rgba(255, 255, 255, 1)";
      divWarning.style.color = "rgba(0, 0, 0, 1)";
      divWarning.style.width = imgCode.getAttribute("width") + "px";
      divWarning.style.padding = "16px";
      divWarning.style.paddingTop = "0px";
      divWarning.style.boxSizing = "border-box";
      divWarning.style.textAlign = "center";
    }
  } else {
    window.alert("Too much information for the QR code, try again with less.");
  }
};



QRCoder.createElementFromHTML = function (html) {
  var fragment = document.createDocumentFragment();

  var element = document.createElement("div");
  element.innerHTML = html;

  while (element.childNodes[0]) {
    fragment.appendChild(element.childNodes[0]);
  }

  return fragment;
}



Node.prototype.removeAllChilds = function () {
  while (this.firstChild) {
    this.firstChild.removeAllChilds();
    this.removeChild(this.firstChild);
  }

  return this;
};



Node.prototype.deleteSelf = function () {
  this.removeAllChilds().parentNode.removeChild(this);

  return this;
};