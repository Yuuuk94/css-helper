import { DefaultData } from 'types/defaultData';
import { getAssets, getBgImg } from './assets';
import { getColors } from './colors';
import { getBodyStyle, getFontsFamily, getPageTitle } from './styles';

export const getDefaultData: () => DefaultData = () => {
  const all = document.querySelectorAll('*');
  const colors: Set<string> = new Set();
  const assets: Record<string, string> = {};
  const bodyStyle = getBodyStyle();
  const headingsFonts: Set<string> = new Set();
  const bodyFonts: Set<string> = new Set();
  let pageTitle = '';

  for (let a of all) {
    const computedStyle = window.getComputedStyle(a);

    if (
      a.tagName == 'META' ||
      a.tagName == 'LINK' ||
      a.tagName == 'IMG' ||
      a.tagName == 'VIDEO'
    ) {
      // assets 수집
      const asset = getAssets(a);
      if (!!asset.imageUrl && !assets.hasOwnProperty(asset.imageUrl))
        assets[asset.imageUrl] = asset.value;
      if (!!asset.videoUrl && !assets.hasOwnProperty(asset.videoUrl))
        assets[asset.videoUrl] = asset.value;
    } else if (a.tagName === 'TITLE') {
      // page title 수집
      pageTitle = getPageTitle(a);
      continue;
    } else if (
      a.tagName === 'H1' ||
      a.tagName === 'H2' ||
      a.tagName === 'H3' ||
      a.tagName === 'H4' ||
      a.tagName === 'H5' ||
      a.tagName === 'H6'
    ) {
      // headings font 수집
      const headingsFont = getFontsFamily(
        computedStyle.getPropertyValue('font-family')
      );
      headingsFont.map((font) => headingsFonts.add(font));
    } else if (a.tagName === 'BODY') {
      // body font 수집
      const bodyFont = getFontsFamily(
        computedStyle.getPropertyValue('font-family')
      );
      bodyFont.map((font) => bodyFonts.add(font));
    }

    // background에서 asset 수집
    const bgAsset = getBgImg(computedStyle);
    if (!!bgAsset && !assets.hasOwnProperty(bgAsset))
      assets[bgAsset] = 'image ';

    // colors 수집
    const colorList = getColors(computedStyle);
    if (colorList.length > 0)
      colorList.map((color) => color && colors.add(color));
  }

  const arrayHeadingsFonts = Array.from(headingsFonts);
  const arrayBddyFonts = Array.from(bodyFonts);
  const arrayColors = Array.from(colors);

  return {
    pageTitle,
    headingsFonts: arrayHeadingsFonts,
    bodyFonts: arrayBddyFonts,
    colors: arrayColors,
    assets,
    bodyStyle,
  };
};
