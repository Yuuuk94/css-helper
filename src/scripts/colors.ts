export const getColors = (computedStyle: CSSStyleDeclaration) => {
  const colorList = [];
  const fontColor = validColors(computedStyle.getPropertyValue('color'));
  colorList.push(...fontColor);

  const backgroundcolor = validColors(
    computedStyle.getPropertyValue('background-color')
  );
  colorList.push(...backgroundcolor);

  const fill = validColors(computedStyle.getPropertyValue('fill'));
  colorList.push(...fill);

  const borderColor = validColors(
    computedStyle.getPropertyValue('border-color')
  );
  colorList.push(...borderColor);

  return colorList;
};

const validColors = (color: string) => {
  if (color?.includes('url') || color === 'none') return [];
  const colorList = color.split('rgb');
  return colorList.map((color) => color && 'rgb' + color.trim());
};
