console.log('background work');

chrome.action.onClicked.addListener(function (tab) {
  console.log('hello');
});

// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//   chrome.tabs.sendMessage(
//     tabs[0].id as number,
//     { greeting: 'hello' },
//     function (response) {
//       console.log(response);
//     }
//   );
// });
