import { hasApp, onLoadApp } from './load';
import { closeApp } from './closeApp';
import { IFRAME_MESSAGE, MessageProps } from 'types/message';

console.log('css resipe start');
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
