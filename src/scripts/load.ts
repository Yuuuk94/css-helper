import { defaultDataId, popupId, popupIframeId } from './constans';
import { getDefaultData } from './defaultData';

export const onLoadApp = () => {
  const extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
  const target = chrome.runtime.getURL('index.html');

  if (!location.ancestorOrigins.contains(extensionOrigin)) {
    const commonStyle = 'width:320px;height:600px;';
    const popup = document.createElement('div');
    popup.id = popupId;

    popup.style.cssText =
      commonStyle +
      'position:fixed;top:12px;right:12px;display:block;z-index:9999;';

    const iframe = document.createElement('iframe');
    iframe.id = popupIframeId;

    iframe.style.cssText =
      commonStyle +
      'border:none;box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);';
    document.body.appendChild(popup);
    const defaultData = getDefaultData();

    iframe.onload = async function () {
      const iframeDoc =
        iframe?.contentWindow?.document || iframe.contentDocument;
      if (iframeDoc) {
        const response = await fetch(target);
        const htmlText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        iframeDoc.head.innerHTML = doc.head.innerHTML;
        iframeDoc.body.innerHTML = doc.body.innerHTML;

        const defaultScript = iframeDoc.createElement('noscript');
        defaultScript.id = defaultDataId;
        defaultScript.innerHTML = JSON.stringify(defaultData);
        iframeDoc.body.appendChild(defaultScript);

        const reactScript = iframeDoc.createElement('script');
        reactScript.src = extensionOrigin + '/js/popup.js';
        reactScript.async = true;
        iframeDoc.head.appendChild(reactScript);
      }
    };

    popup.appendChild(iframe);
  }
};

export const hasApp = () => {
  return document.getElementById(popupId);
};

export const closeApp = () => {
  window.location.reload();
};
