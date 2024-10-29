import { MessageProps } from 'types/message';
import { IFRAME_MESSAGE, popupIframeId } from './constans';
import { closeApp } from './load';

export const sendMessageToIframe = <T = any>(data: MessageProps<T>) => {
  const iframeApp = document.getElementById(popupIframeId) as HTMLIFrameElement;
  if (iframeApp.contentWindow) {
    iframeApp.contentWindow.postMessage(JSON.stringify(data));
  }
};

export const getMessageFromIframe = (e: MessageEvent<string>) => {
  console.log('parent', e);
  const messageData: MessageProps = JSON.parse(e.data);
  switch (messageData.id) {
    case IFRAME_MESSAGE.CLOSE_APP:
      closeApp();
      break;

    default:
      return;
  }
};
