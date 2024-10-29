console.log('background work');

/* global chrome */
chrome.action.onClicked.addListener(async () => {
  const [activeTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  if (activeTab.id) {
    chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      files: ['js/scripts.js'],
    });
    // chrome.scripting.insertCSS({
    //   target: { tabId: activeTab.id },
    //   files: ['styles/page.css'],
    // });
  }
});
