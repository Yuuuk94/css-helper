import { closeApp, hasApp, onLoadApp } from './load';
import { getMessageFromIframe } from './message';

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
}

window.addEventListener('message', getMessageFromIframe);
