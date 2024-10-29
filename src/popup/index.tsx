import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { popupRouter } from './router';

import styledTheme from 'styles';
import GlobalStyle from 'popup/components/GlobalStyled';

const target = document.getElementById('css-helper-root');
const root = createRoot(target!);

root.render(
  <React.StrictMode>
    <StyledThemeProvider theme={styledTheme}>
      <GlobalStyle />
      <RouterProvider router={popupRouter} />
    </StyledThemeProvider>
  </React.StrictMode>
);
