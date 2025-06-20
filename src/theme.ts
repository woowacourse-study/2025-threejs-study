import type { CSSObject } from '@emotion/react';

export const theme = {
  colors: {
    white: '#FFFFFF',
    gray: '#ADB5BD',
    black: '#212529',
  },
  fonts: {
    header: {
      fontSize: '40px',
      lineHeight: '56px',
      fontWeight: 700,
    } as CSSObject,
    subHeading: {
      fontSize: '20px',
      lineHeight: '19px',
      fontWeight: 500,
    } as CSSObject,
    body: {
      fontSize: '14px',
      lineHeight: 'normal',
      fontWeight: 400,
    } as CSSObject,
  },
} as const;

export type Theme = typeof theme;
