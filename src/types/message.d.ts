export type messageIdType = 'close_app' | 'send_clipboard' | 'download_asset';

export interface MessageProps<T = any> {
  id: messageIdType;
  contents?: T;
}
