export const getDefaultData = () => {
  const all = document.querySelectorAll('*');
  const colors: Set<string> = new Set();
  const assets = {};
  const bodyStyle = getBodyStyle();
  for (let a of all) {
    if (
      a.tagName == 'META' ||
      a.tagName == 'LINK' ||
      a.tagName == 'IMG' ||
      a.tagName == 'VIDEO'
    ) {
      getAssets(assets, a);
    } else {
      getColors(colors, a);
    }
  }

  const arrayColors = Array.from(colors);
  return { colors: arrayColors, assets, bodyStyle };
};

const getColors = (colors: Set<string>, target: Element) => {
  const computedStyle = window.getComputedStyle(target);
  const color = computedStyle.getPropertyValue('color');
  const backgroundcolor = computedStyle.getPropertyValue('background-color');
  colors.add(color).add(backgroundcolor);
};

const getAssets = (assets: Record<string, string>, target: Element) => {
  const tagName = target.tagName;
  let imageUrl = '';
  let value = '';
  switch (tagName) {
    case 'LINK':
      if (
        target.getAttribute('rel') === 'icon' &&
        target.getAttribute('href')
      ) {
        imageUrl = getFullUrl(target.getAttribute('href') as string);
        value = 'icon';
      }
      break;
    case 'META':
      if (
        target.getAttribute('property')?.includes('image') &&
        target.getAttribute('content')
      ) {
        imageUrl = getFullUrl(target.getAttribute('content') as string);
        value = 'open graph';
      }
      break;
    case 'IMG':
      if (target.getAttribute('src')) {
        imageUrl = getFullUrl(target.getAttribute('src') as string);
        value = target.getAttribute('alt') || 'image';
      }
      break;
    case 'VIDEO':
      if (target.getAttribute('src')) {
        imageUrl = getFullUrl(target.getAttribute('src') as string);
        value = target.getAttribute('alt') || 'video';
      }
      break;
    default:
      break;
  }
  if (!!imageUrl && !assets.hasOwnProperty(imageUrl)) assets[imageUrl] = value;
};

const getFullUrl = (url: string) => {
  return url.includes('https://') ? url : window.location.origin + url;
};

const getBodyStyle = () => {
  const body = document.querySelector('body');
  const computedStyle = window.getComputedStyle(body as Element);
  return computedStyle;
};
