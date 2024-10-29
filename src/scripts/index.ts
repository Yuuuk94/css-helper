import { getDefaultData } from './defaultData';
import { IFRAME_MESSAGE } from './constans';
import { closeApp, hasApp, onLoadApp } from './load';
import { getMessageFromIframe, sendMessageToIframe } from './message';

console.log(`
     ____  ____  ____    ____  _____ ____  _  ____  _____   ____  _____  ____  ____  _____ 
    /   _\/ ___\/ ___\  /  __\/  __//   _\/ \/  __\/  __/  / ___\/__ __\/  _ \/  __\/__ __\
    |  /  |    \|    \  |  \/||  \  |  /  | ||  \/||  \    |    \  / \  | / \||  \/|  / \  
    |  \__\___ |\___ |  |    /|  /_ |  \__| ||  __/|  /_   \___ |  | |  | |-|||    /  | |  
    \____/\____/\____/  \_/\_\\____\\____/\_/\_/   \____\  \____/  \_/  \_/ \|\_/\_\  \_/  
                                                                                       
`);

if (hasApp()) {
  closeApp();
} else {
  onLoadApp();
  const { colors, assets, bodyStyle } = getDefaultData();
  //FIXME: 호출 타이밍 수정 필요
  setTimeout(() => {
    sendMessageToIframe({
      id: IFRAME_MESSAGE.SEND_COLORS,
      contents: colors,
    });
    sendMessageToIframe({
      id: IFRAME_MESSAGE.SEND_ASSETS,
      contents: assets,
    });
    sendMessageToIframe({
      id: IFRAME_MESSAGE.SEND_ASSETS,
      contents: bodyStyle,
    });
  }, 100);
}

window.addEventListener('message', getMessageFromIframe);
