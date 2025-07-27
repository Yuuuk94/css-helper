import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { popupRouter } from './router';

import styledTheme from 'styles';
import GlobalStyle from 'popup/components/GlobalStyled';
import { DefaultDataContext } from './hooks/useDataContext';

const App = () => {
  return (
    <React.StrictMode>
      <DefaultDataContext>
        <StyledThemeProvider theme={styledTheme}>
          <GlobalStyle />
          <RouterProvider router={popupRouter} />
        </StyledThemeProvider>
      </DefaultDataContext>
    </React.StrictMode>
  );
};

export default App;
