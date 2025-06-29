import { ThemeProvider } from '@emotion/react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/routes';
import { GlobalStyle } from './styles/GlobalStyle';
import { theme } from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
