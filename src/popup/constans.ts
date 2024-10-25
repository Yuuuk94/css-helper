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
    label: 'colors',
    path: ROUTE_PATH.COLORS,
  },
  {
    label: 'settings',
    path: ROUTE_PATH.SETTINGS,
  },
  //   {
  //     label: 'styles',
  //     path: ROUTE_PATH.STYLES,
  //   },
  //   {
  //     label: 'assets',
  //     path: ROUTE_PATH.ASSETS,
  //   },
  //   {
  //     label: 'wireframe',
  //     path: ROUTE_PATH.WIREFRAME,
  //   },
] as const;
