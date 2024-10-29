console.log('start scripts');

var extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
var target = chrome.runtime.getURL('index.html');
// , 'js/popup.js', 'js/vendor.js'
if (!location.ancestorOrigins.contains(extensionOrigin)) {
  var div = document.createElement('div');
  div.id = 'css-helper-root';
  div.style.cssText =
    'position:fixed;top:12px;right:12px;display:block;' +
    'width:300px;height:600px;z-index:3000;';

  div.onload = async function () {
    if (div) {
      const response = await fetch(target);
      const htmlText = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      document.head.innerHTML = doc.head.innerHTML;
      //   document.body.innerHTML = doc.body.innerHTML;
    }
  };
  document.body.appendChild(div);
}

function addScriptToHeader(scriptUrl: string) {
  // 스크립트 태그 생성
  const script = document.createElement('script');

  // 스크립트 URL 설정
  script.src = scriptUrl;
  script.type = 'text/javascript';
  script.async = true;

  // <head>에 스크립트 태그 추가
  document.head.appendChild(script);
}
