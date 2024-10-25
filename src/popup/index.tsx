import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { popupRouter } from './router';

import styledTheme from 'styles';
import GlobalStyle from 'components/GlobalStyled';

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <StyledThemeProvider theme={styledTheme}>
      <GlobalStyle />
      <RouterProvider router={popupRouter} />
    </StyledThemeProvider>
  </React.StrictMode>
);
