export const getAssets = (target: Element) => {
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

  return {
    imageUrl,
    videoUrl,
    value,
  };
};

export const getBgImg = (computedStyle: CSSStyleDeclaration) => {
  return computedStyle.getPropertyValue('background-image').includes('url')
    ? getFullUrl(
        computedStyle
          .getPropertyValue('background-image')
          .replace('url("', '')
          .replace('")', '')
      )
    : null;
};

export const getFullUrl = (url: string) => {
  return url?.includes('https://') ||
    url?.includes('http://') ||
    url?.includes('data:')
    ? url
    : window.location.origin +
        url?.replaceAll('../', '/')?.replaceAll('./', '/');
};
