import { MessageProps } from 'types/message';

export const sendMessageToApp = <T = any>(data: MessageProps<T>) => {
  window.parent.postMessage(JSON.stringify(data), '*');
};

export const IFRAME_MESSAGE = {
  CLOSE_APP: 'close_app',
  SEND_COLORS: 'send_colors',
  SEND_ASSETS: 'send_assets',
  SEND_BODY_STYLES: 'send_body_styles',
};
