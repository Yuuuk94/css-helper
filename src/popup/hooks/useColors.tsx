const useColors = () => {
  return { isLightColor, colorSort, rgbToHex };
};

export default useColors;

// 레퍼런스 - https://awik.io/determine-color-bright-dark-using-javascript/
// HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
function isLightColor(color: string) {
  const newColor = getHsp(color);
  const dark = 127.5;
  return (newColor.a && newColor.a < 0.6) || newColor.hsp > dark;
}

function colorSort(colorList: string[]) {
  return colorList.sort((a, b) => {
    const gapHsp = getHsp(a).hsp - getHsp(b).hsp;
    if (gapHsp === 0) return (getHsp(b).a || 1) - (getHsp(a).a || 1);

    return gapHsp;
  });
}

const getHsp = (color: string) => {
  let r, g, b, a, hsp;
  let newColor: any = color;
  newColor = newColor?.match(
    /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
  );

  r = newColor[1];
  g = newColor[2];
  b = newColor[3];
  a = newColor[4];

  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
  return { r, g, b, a, hsp };
};

function rgbToHex(rgbType: string) {
  const newColor: any = getHsp(rgbType);
  let rgb = [newColor.r, newColor.g, newColor.b];

  rgb.forEach((str, x, arr) => {
    /* 컬러값이 "%"일 경우, 변환하기. */
    if (str.indexOf('%') > -1)
      str = Math.round(parseFloat(str) * 2.55).toString();
    /* 16진수 문자로 변환하기. */
    str = parseInt(str, 10).toString(16);
    if (str.length === 1) str = '0' + str;

    arr[x] = str;
  });

  return { hex: '#' + rgb.join(''), opacity: newColor.a };
}
