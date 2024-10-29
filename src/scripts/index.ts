console.log('start scripts');

var extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
var target = chrome.runtime.getURL('index.html');

if (!location.ancestorOrigins.contains(extensionOrigin)) {
  var popup = document.createElement('div');
  var iframe = document.createElement('iframe');

  popup.id = 'css-recipe-popup';
  popup.style.cssText =
    'position:fixed;top:12px;right:12px;display:block;' +
    'width:320px;height:600px;z-index:5000;';

  iframe.style.cssText = 'width:320px;height:600px;';
  document.body.appendChild(popup);

  iframe.onload = async function () {
    const iframeDoc = iframe?.contentWindow?.document || iframe.contentDocument;
    if (iframeDoc) {
      // index.html 내용을 iframe에 로드
      const response = await fetch(target);
      const htmlText = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      iframeDoc.head.innerHTML = doc.head.innerHTML;
      iframeDoc.body.innerHTML = doc.body.innerHTML;

      // React와 ReactDOM 스크립트 주입
      const reactScript = iframeDoc.createElement('script');
      reactScript.src = extensionOrigin + '/js/popup.js';
      reactScript.async = true;

      const reactDomScript = iframeDoc.createElement('script');
      reactDomScript.src = extensionOrigin + '/js/vendor.js';
      reactDomScript.async = true;

      iframeDoc.head.appendChild(reactScript);
      iframeDoc.head.appendChild(reactDomScript);
    }
  };

  popup.appendChild(iframe);
}
