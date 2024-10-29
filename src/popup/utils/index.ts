import { MessageProps } from 'types/message';

export const sendMessageToApp = <T = any>(data: MessageProps<T>) => {
  window.parent.postMessage(JSON.stringify(data));
};
