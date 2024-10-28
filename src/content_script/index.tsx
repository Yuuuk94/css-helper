console.log('content script work');
// Avoid recursive frame insertion...
var extensionOrigin = 'chrome-extension://' + chrome.runtime.id;

if (!location.ancestorOrigins.contains(extensionOrigin)) {
  var iframe = document.createElement('iframe');
  // Must be declared at web_accessible_resources in manifest.json
  iframe.src = chrome.runtime.getURL('index.html');

  // Some styles for a fancy sidebar
  iframe.style.cssText =
    'position:fixed;top:0;left:0;display:block;' +
    'width:300px;height:100%;z-index:1000;';
  //   document.body.appendChild(iframe);
}

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(
    tabs[0].id as number,
    { greeting: 'hello' },
    function (response) {
      if (!chrome.runtime.lastError) {
        // if you have any response
      } else {
        // if you don't have any response it's ok but you should actually handle
        // it and we are doing this when we are examining chrome.runtime.lastError
      }
    }
  );
});
