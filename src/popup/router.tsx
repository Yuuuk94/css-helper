import React from 'react';
import { createMemoryRouter } from 'react-router-dom';

import PopupIndex from './pages';
import ColorsPage from './pages/Colors';
import { ROUTE_PATH } from './constans';
import SettingsPage from './pages/Settings';
import Assets from './pages/Assets';
import Styles from './pages/Styles';

export const popupRouter = createMemoryRouter(
  [
    {
      path: ROUTE_PATH.HOME,
      element: <PopupIndex />,
      children: [
        {
          path: ROUTE_PATH.STYLES.replace('/', ''),
          element: <Styles />,
        },
        {
          path: ROUTE_PATH.COLORS.replace('/', ''),
          element: <ColorsPage />,
        },
        {
          path: ROUTE_PATH.ASSETS.replace('/', ''),
          element: <Assets />,
        },
        {
          path: ROUTE_PATH.SETTINGS.replace('/', ''),
          element: <SettingsPage />,
        },
      ],
    },
  ],
  {
    initialEntries: ['/'],
  }
);
