export const getPageTitle = (target: Element) => {
  return target.textContent || '';
};

export const getFontsFamily = (fontFamily?: string) => {
  const fontList = fontFamily
    ? fontFamily?.replaceAll(`"`, '')?.replaceAll(`'`, '')?.split(', ')
    : [];
  return fontList;
};

export const getBodyStyle = () => {
  const body = document.querySelector('body');
  const computedStyle = window.getComputedStyle(body as Element);
  return computedStyle;
};

// export function displayElementStyles(element: HTMLElement) {
//   const computedStyles = window.getComputedStyle(element);
//   const styleSheets = Array.from(document.styleSheets);

//   // 각 스타일시트를 검사하여 특정 요소에 맞는 스타일 규칙을 찾음
//   for (let sheet of styleSheets) {
//     try {
//       const rules = Array.from(sheet.cssRules || sheet.rules);

//       for (let rule of rules) {
//         // console.log(rule);
//         // CSS 규칙이 선택자 텍스트를 가지고 있는지 확인
//         // if (rule?.selectorText && element.matches(rule.selectorText)) {
//         //   console.log(`Selector: ${rule.selectorText}`);
//         //   console.log(`Source: ${sheet.href || 'inline style'}`);
//         //   // 규칙의 모든 스타일 속성을 출력
//         //   const style = rule.style;
//         //   for (let i = 0; i < style.length; i++) {
//         //     const propName = style[i];
//         //     const propValue = style.getPropertyValue(propName);
//         //     console.log(`  ${propName}: ${propValue};`);
//         //   }
//         //   console.log('-------------------------');
//         // }
//       }
//     } catch (e) {
//       console.warn('Unable to access stylesheet:', sheet.href, e);
//     }
//   }

//   // 인라인 스타일과 기본 스타일 출력
//   // console.log('Computed Styles:');
//   // for (let i = 0; i < computedStyles.length; i++) {
//   //   const propName = computedStyles[i];
//   //   const propValue = computedStyles.getPropertyValue(propName);
//   //   console.log(`  ${propName}: ${propValue};`);
//   // }
// }
