import React from 'react';
import { createMemoryRouter } from 'react-router-dom';

import PopupIndex from './pages';
import ColorsPage from './pages/Colors';
import { ROUTE_PATH } from './constans';
import SettingsPage from './pages/Settings';

export const popupRouter = createMemoryRouter(
  [
    {
      path: ROUTE_PATH.HOME,
      element: <PopupIndex />,
      children: [
        {
          path: ROUTE_PATH.COLORS.replace('/', ''),
          element: <ColorsPage />,
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
