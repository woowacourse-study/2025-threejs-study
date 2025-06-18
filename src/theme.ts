export const theme = {
  colors: {
    white: '#FFFFFF',
    gray1: '#F1F3F5',
    gray2: '#ADB5BD',
    gray3: '#212529',
  },
  fonts: {
    header: {
      fontFamily: 'sans-serif',
      fontSize: '32px',
      lineHeight: '44px',
      fontWeight: 700,
    },
    subHeading: {
      fontFamily: 'sans-serif',
      fontSize: '16px',
      lineHeight: '19px',
      fontWeight: 500,
    },
    body: {
      fontFamily: 'sans-serif',
      fontSize: '12px',
      lineHeight: 'normal',
      fontWeight: 400,
    },
  },
} as const;

export type Theme = typeof theme;
