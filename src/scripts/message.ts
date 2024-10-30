import { MessageProps } from 'types/message';
import { IFRAME_MESSAGE, popupIframeId } from './constans';
import { closeApp } from './load';

export const sendMessageToIframe = <T = any>(data: MessageProps<T>) => {
  const iframeApp = document.getElementById(popupIframeId) as HTMLIFrameElement;
  if (iframeApp.contentWindow) {
    iframeApp.contentWindow.postMessage(JSON.stringify(data));
  }
};

export const getMessageFromIframe = async (e: MessageEvent<string>) => {
  console.log('parent', e);
  const messageData: MessageProps = JSON.parse(e.data);
  switch (messageData.id) {
    case IFRAME_MESSAGE.CLOSE_APP:
      closeApp();
      break;
    case IFRAME_MESSAGE.SEND_CLIPBOARD:
      copyToClipboard(messageData.contents);
      break;
    case IFRAME_MESSAGE.DOWNLOAD_ASSET:
      await imgDownload(messageData.contents);
      break;
    default:
      return;
  }
};

const copyToClipboard = (text: string) => {
  window.navigator.clipboard.writeText(text);
};
async function imgDownload({ url, name }: { url: string; name: string }) {
  var a = document.createElement('a');
  a.href = await toDataURL(url);
  a.target = '_blink';
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

async function toDataURL(url: string) {
  const blob = await fetch(url)
    .then((res) => res.blob())
    .catch((e) => {
      alert('disabled download');
      return null;
    });
  return blob ? URL.createObjectURL(blob) : url;
}
