import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { DefaultData } from 'types/defaultData';

interface Context extends DefaultData {}

let defaultDataTag = document.getElementById('default-data-app') as HTMLElement;
const defaultData: DefaultData = JSON.parse(defaultDataTag.innerText as string);

const context = createContext<DefaultData | null>(null);

export const DefaultDataContext = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<DefaultData>(
    () => defaultData as DefaultData
  );

  return <context.Provider value={data}>{children}</context.Provider>;
};

export const useDataContext = () => useContext(context) as Context;
