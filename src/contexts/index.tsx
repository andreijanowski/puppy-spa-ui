import React from 'react';

import { PuppyProvider } from './puppy.context';
import { WaitListProvider } from './waitList.context';

function AppProviders({ children }: { children: JSX.Element[] | JSX.Element }) {
  return (
    <WaitListProvider>
      <PuppyProvider>
        {children}
      </PuppyProvider>
    </WaitListProvider>
  );
}

export default AppProviders;
