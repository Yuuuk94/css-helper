import { popupId, popupIframeId } from './constans';

export const onLoadApp = () => {
  const extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
  const target = chrome.runtime.getURL('index.html');

  if (!location.ancestorOrigins.contains(extensionOrigin)) {
    const commonStyle = 'width:320px;height:600px;';
    const popup = document.createElement('div');
    popup.id = popupId;

    popup.style.cssText =
      commonStyle +
      'position:fixed;top:12px;right:12px;display:block;z-index:5000;';

    const iframe = document.createElement('iframe');
    iframe.id = popupIframeId;
    iframe.style.cssText =
      commonStyle +
      'border:none;box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);';
    document.body.appendChild(popup);

    iframe.onload = async function () {
      const iframeDoc =
        iframe?.contentWindow?.document || iframe.contentDocument;
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
        iframeDoc.head.appendChild(reactScript);

        // const reactDomScript = iframeDoc.createElement('script');
        // reactDomScript.src = extensionOrigin + '/js/vendor.js';
        // reactDomScript.async = true;
        // iframeDoc.head.appendChild(reactDomScript);
      }
    };

    popup.appendChild(iframe);
  }
};

export const hasApp = () => {
  return document.getElementById(popupId);
};
