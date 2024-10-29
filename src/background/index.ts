console.log('background work');

chrome.action.onClicked.addListener((tab: chrome.tabs.Tab) => {
  if (tab.id) {
    // 현재 활성 탭에서 content script 실행
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['js/scripts.js', 'js/popup.js', 'js/vendor.js'],
    });
  }
});
