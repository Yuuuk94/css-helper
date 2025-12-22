import useColors from './useColors';

const useStyles = (style: CSSStyleDeclaration) => {
  const { rgbToHex } = useColors();

  function getStylesByKeys(style: CSSStyleDeclaration, styleKeys: string[]) {
    const newStyleKeys = styleKeys.map((key) => key.split('-').join(''));
    const newStyle = Object.keys(style).reduce(
      (acc: Record<string, string>, value) => {
        const styleKeysIndex = newStyleKeys.indexOf(
          value.toString().toLowerCase()
        );
        if (styleKeysIndex > -1) {
          const newValue = style[value as any];
          acc[styleKeys[styleKeysIndex]] = value.includes('color')
            ? rgbToHex(newValue)?.hex
            : newValue;
        }
        return acc;
      },
      {}
    );
    return newStyle;
  }

  const typeFaceKey = [
    'font-size',
    'line-height',
    'text-align',
    'letter-spacing',
    'color',
  ];
  const typeFace = getStylesByKeys(style, typeFaceKey);
  const styles = {};
  return { typeFace, typeFaceKey, styles, copyStyleToClipboard };
};

export default useStyles;

function copyStyleToClipboard(selector: string, style: Record<string, string>) {
  return JSON.stringify(style);
}
