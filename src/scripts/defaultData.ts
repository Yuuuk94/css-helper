import { DefaultData } from 'types/defaultData';

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
      getAssets(assets, a);
    } else if (a.tagName === 'TITLE') {
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
      getFontsFamily(
        headingsFonts,
        computedStyle.getPropertyValue('font-family')
      );
    } else if (a.tagName === 'BODY') {
      getFontsFamily(bodyFonts, computedStyle.getPropertyValue('font-family'));
    }

    getBgImg(assets, computedStyle);
    getColors(colors, computedStyle);
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

const getBodyStyle = () => {
  const body = document.querySelector('body');
  const computedStyle = window.getComputedStyle(body as Element);
  displayElementStyles(body as HTMLBodyElement);

  return computedStyle;
};

const getAssets = (assets: Record<string, string>, target: Element) => {
  const tagName = target.tagName;
  let imageUrl = '';
  let videoUrl = '';
  let value = '';
  switch (tagName) {
    case 'LINK':
      if (
        target.getAttribute('rel')?.includes('icon') &&
        target.getAttribute('href')
      ) {
        imageUrl = getFullUrl(target.getAttribute('href') as string);
        value = 'app icon ' + (target.getAttribute('sizes') || '');
      }
      break;
    case 'META':
      if (
        target.getAttribute('property')?.includes('image') &&
        !target.getAttribute('property')?.includes('image:') &&
        target.getAttribute('content')
      ) {
        imageUrl = getFullUrl(target.getAttribute('content') as string);
        value = 'open graph';
      }
      break;
    case 'IMG':
      if (target.getAttribute('src')) {
        imageUrl = getFullUrl(target.getAttribute('src') as string);
        value = 'image ' + (target.getAttribute('alt') || '');
      }
      break;
    case 'VIDEO':
      if (target.getAttribute('src')) {
        videoUrl = getFullUrl(target.getAttribute('src') as string);
        imageUrl = getFullUrl(target.getAttribute('poster') as string);
        value = 'video ' + (target.getAttribute('alt') || '');
      }
      break;
    default:
      break;
  }
  if (!!imageUrl && !assets.hasOwnProperty(imageUrl)) assets[imageUrl] = value;
  if (!!videoUrl && !assets.hasOwnProperty(videoUrl)) assets[videoUrl] = value;
};

const getBgImg = (
  assets: Record<string, string>,
  computedStyle: CSSStyleDeclaration
) => {
  const backgroundImageUrl = computedStyle
    .getPropertyValue('background-image')
    .includes('url')
    ? getFullUrl(
        computedStyle
          .getPropertyValue('background-image')
          .replace('url("', '')
          .replace('")', '')
      )
    : null;
  if (!!backgroundImageUrl && !assets.hasOwnProperty(backgroundImageUrl))
    assets[backgroundImageUrl] = 'image ';
};

const getFullUrl = (url: string) => {
  return url?.includes('https://') ||
    url?.includes('http://') ||
    url?.includes('data:')
    ? url
    : window.location.origin +
        url?.replaceAll('../', '/')?.replaceAll('./', '/');
};

const getPageTitle = (target: Element) => {
  return target.textContent || '';
};

const getColors = (colors: Set<string>, computedStyle: CSSStyleDeclaration) => {
  const color = computedStyle.getPropertyValue('color');
  if (color) colors.add(color);

  const backgroundcolor = computedStyle.getPropertyValue('background-color');
  if (backgroundcolor && !backgroundcolor?.includes('url'))
    colors.add(backgroundcolor);

  const fill = computedStyle.getPropertyValue('fill');
  if (fill && fill !== 'none' && !fill?.includes('url')) colors.add(fill);

  const borderColor = computedStyle.getPropertyValue('border-color');
  if (borderColor && borderColor !== 'none' && !borderColor?.includes('url'))
    colors.add(borderColor);
};

const getFontsFamily = (fonts: Set<string>, fontFamily?: string) => {
  const fontList = fontFamily
    ? fontFamily?.replaceAll(`"`, '')?.replaceAll(`'`, '')?.split(', ')
    : [];
  fontList.map((font) => fonts.add(font));
};

function displayElementStyles(element: HTMLBodyElement) {
  const computedStyles = window.getComputedStyle(element);
  const styleSheets = Array.from(document.styleSheets);

  // 각 스타일시트를 검사하여 특정 요소에 맞는 스타일 규칙을 찾음
  for (let sheet of styleSheets) {
    try {
      const rules = Array.from(sheet.cssRules || sheet.rules);

      for (let rule of rules) {
        console.log(rule);
        // CSS 규칙이 선택자 텍스트를 가지고 있는지 확인
        // if (rule?.selectorText && element.matches(rule.selectorText)) {
        //   console.log(`Selector: ${rule.selectorText}`);
        //   console.log(`Source: ${sheet.href || 'inline style'}`);
        //   // 규칙의 모든 스타일 속성을 출력
        //   const style = rule.style;
        //   for (let i = 0; i < style.length; i++) {
        //     const propName = style[i];
        //     const propValue = style.getPropertyValue(propName);
        //     console.log(`  ${propName}: ${propValue};`);
        //   }
        //   console.log('-------------------------');
        // }
      }
    } catch (e) {
      console.warn('Unable to access stylesheet:', sheet.href, e);
    }
  }

  // 인라인 스타일과 기본 스타일 출력
  // console.log('Computed Styles:');
  // for (let i = 0; i < computedStyles.length; i++) {
  //   const propName = computedStyles[i];
  //   const propValue = computedStyles.getPropertyValue(propName);
  //   console.log(`  ${propName}: ${propValue};`);
  // }
}
