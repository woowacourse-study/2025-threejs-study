import { Global } from '@emotion/react';
import { common } from './common';
import { reset } from './reset';

export const GlobalStyle = () => {
  return <Global styles={[reset, common]} />;
};
