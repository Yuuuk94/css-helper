console.log('work');

function injectScript(src: string) {
  const s = document.createElement('script');
  s.src = chrome.runtime.getURL(src);
  s.onload = () => s.remove();
  (document.head || document.documentElement).append(s);
}

// chrome.browserAction.onClicked.addListener(function (tab) {
//   injectScript("js/scripts.js");
// });
