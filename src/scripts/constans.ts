import { messageIdType } from 'types/message';

export const popupId = 'css-recipe-popup';
export const popupIframeId = 'css-recipe-popup-iframe';
export const defaultDataId = 'default-data-app';

export const IFRAME_MESSAGE: Record<string, messageIdType> = {
  CLOSE_APP: 'close_app',
  SEND_CLIPBOARD: 'send_clipboard',
  DOWNLOAD_ASSET: 'download_asset',
};
