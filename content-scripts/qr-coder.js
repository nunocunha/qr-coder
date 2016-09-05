var QRCoder = QRCoder || {};

QRCoder.maxSize = 40;

QRCoder.showOverlay = function (base64, getFromSelection) {
  var data = (typeof getFromSelection === "boolean" && getFromSelection) ? window.getSelection().toString() : window.atob(base64);
  var threwException = false;
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
    divShader.style.backgroundImage = "url('" + imgCode.childNodes[0].src + "')";
    divShader.style.backgroundRepeat = "no-repeat";
    divShader.style.backgroundPosition = "center";
    divShader.style.zIndex = "10000000";
    divShader.addEventListener("click", function (event) {
      divShader.deleteSelf();
    }, false);
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