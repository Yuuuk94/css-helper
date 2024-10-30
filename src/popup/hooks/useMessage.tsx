import { MessageProps } from 'types/message';

const useMessage = () => {
  return { sendMessageToApp };
};

export default useMessage;

export const sendMessageToApp = <T = any,>(data: MessageProps<T>) => {
  window.parent.postMessage(JSON.stringify(data), '*');
};
