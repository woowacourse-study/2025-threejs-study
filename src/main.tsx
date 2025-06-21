import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import App from './App';
import { theme } from './theme';
import './reset.css';
import './index.css';

// biome-ignore lint/style/noNonNullAssertion: #root is guaranteed to exist in the HTML
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
