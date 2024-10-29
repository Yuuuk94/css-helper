export interface MessageProps<T = any> {
  id: string;
  contents?: T;
}

export enum IFRAME_MESSAGE {
  CLOSE_APP = 'close_app',
}
