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
    divShader.setAttribute("id", "qr-coder-shader");
    divShader.addEventListener("click", function (event) {
      divShader.deleteSelf();
    }, false);

    var divAlign = divShader.appendChild(document.createElement("div"));
    divAlign.addEventListener("click", function (event) {
      event.stopPropagation();
    }, false);
    divAlign.setAttribute("id", "qr-coder-align");

    imgCode = divAlign.appendChild(imgCode.childNodes[0]);
    imgCode.setAttribute("id", "qr-coder-image");

    if (size > 12) {
      var divWarning = divAlign.appendChild(document.createElement("div"));
      divWarning.setAttribute("id", "qr-coder-warning");
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