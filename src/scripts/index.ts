import { hasApp, onLoadApp } from './load';
import { closeApp } from './closeApp';
import { MessageProps } from 'types/message';
import { IFRAME_MESSAGE } from './constans';

console.log(`
 ____  ____  ____    ____  _____ ____  _  ____  _____   ____  _____  ____  ____  _____ 
/   _\/ ___\/ ___\  /  __\/  __//   _\/ \/  __\/  __/  / ___\/__ __\/  _ \/  __\/__ __\
|  /  |    \|    \  |  \/||  \  |  /  | ||  \/||  \    |    \  / \  | / \||  \/|  / \  
|  \__\___ |\___ |  |    /|  /_ |  \__| ||  __/|  /_   \___ |  | |  | |-|||    /  | |  
\____/\____/\____/  \_/\_\\____\\____/\_/\_/   \____\  \____/  \_/  \_/ \|\_/\_\  \_/  
                                                                                       
`);
console.log('withmay');

if (hasApp()) {
  closeApp();
} else {
  onLoadApp();
}

window.addEventListener('message', (e) => {
  console.log(e, 'im here');
  const messageData: MessageProps = JSON.parse(e.data);
  switch (messageData.id) {
    case IFRAME_MESSAGE.CLOSE_APP:
      closeApp();
      break;

    default:
      return;
  }
});
