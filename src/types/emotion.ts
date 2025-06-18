import '@emotion/react';
import type { Theme as AppTheme } from '../theme';

declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}
