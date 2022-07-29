import React from 'react';

import { AppProps } from 'next/app';

import '../styles/main.css';
import AppProviders from '../contexts';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AppProviders>
    <Component {...pageProps} />
  </AppProviders>
);

export default MyApp;
