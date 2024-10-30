import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { DefaultData } from 'types/defaultData';

interface Context extends DefaultData {
  bodyStyle: any;
}

let defaultDataTag = document.getElementById('default-data-app') as HTMLElement;
const defaultData: DefaultData = JSON.parse(defaultDataTag.innerText as string);

const context = createContext<Context | null>(null);

export const DefaultDataContext = ({ children }: PropsWithChildren) => {
  const [pageTitle, setPageTitle] = useState<string>('');
  const [headingsFonts, setHeadingsFonts] = useState<string[]>([]);
  const [bodyFonts, setBodyFonts] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [assets, setAssets] = useState<Record<string, string>>({});
  const [bodyStyle, setBodyStyle] = useState({});

  useEffect(() => {
    if (defaultData) {
      setPageTitle(defaultData.pageTitle);
      setHeadingsFonts(defaultData.headingsFonts || []);
      setBodyFonts(defaultData.bodyFonts || []);
      setColors(defaultData.colors || []);
      setAssets(defaultData.assets || {});
      setBodyStyle(defaultData.bodyStyle || {});
    }
  }, []);

  return (
    <context.Provider
      value={{ pageTitle, headingsFonts, bodyFonts, colors, assets, bodyStyle }}
    >
      {children}
    </context.Provider>
  );
};

export const useDataContext = () => useContext(context) as Context;
