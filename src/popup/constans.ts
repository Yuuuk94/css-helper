export const ROUTE_PATH = {
  HOME: '/',
  COLORS: '/colors',
  SETTINGS: '/settings',
  STYLES: '/styles',
  ASSETS: '/assets',
  WIREFRAME: '/wireframe',
} as const;

export const AppTitle = 'css recipe';

export const AppMenuList = [
  {
    label: 'styles',
    path: ROUTE_PATH.STYLES,
  },
  {
    label: 'colors',
    path: ROUTE_PATH.COLORS,
  },
  {
    label: 'assets',
    path: ROUTE_PATH.ASSETS,
  },
  {
    label: 'settings',
    path: ROUTE_PATH.SETTINGS,
  },
  //   {
  //     label: 'wireframe',
  //     path: ROUTE_PATH.WIREFRAME,
  //   },
] as const;

export const defaultAppSetting = {
  colorMode: 0, // 0 - hex, 1 - rgb, 2 - rgba
};
