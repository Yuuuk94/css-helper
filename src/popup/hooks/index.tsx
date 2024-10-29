import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { MessageProps } from 'types/message';
import { IFRAME_MESSAGE } from 'popup/utils';

interface Context {
  colors: string[];
}

const context = createContext<Context | null>(null);

export const DefaultDataContext = ({ children }: PropsWithChildren) => {
  const [colors, setColors] = useState<string[]>([]);
  useEffect(() => {
    const eventListener = (e: MessageEvent<string>) => {
      const messageData: MessageProps = JSON.parse(e.data);
      if (messageData.id === IFRAME_MESSAGE.SEND_COLORS) {
        setColors(messageData.contents as string[]);
      }
      if (messageData.id === IFRAME_MESSAGE.SEND_ASSETS) {
        console.log(messageData.contents);
      }
      if (messageData.id === IFRAME_MESSAGE.SEND_BODY_STYLES) {
        console.log(messageData.contents);
      }
    };
    window.addEventListener('message', eventListener);

    return () => {
      window.removeEventListener('message', eventListener);
    };
  }, []);

  return <context.Provider value={{ colors }}>{children}</context.Provider>;
};

export const useDataContext = () => useContext(context) as Context;
