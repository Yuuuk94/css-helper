import { closeApp, hasApp, onLoadApp } from './load';
import { getMessageFromIframe } from './message';

if (hasApp()) {
  closeApp();
} else {
  console.log('script start');
  onLoadApp();
}

window.addEventListener('message', getMessageFromIframe);
