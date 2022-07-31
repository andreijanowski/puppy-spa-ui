import React, { ReactNode } from 'react';

import clsx from 'clsx';

import Header from '../Header';
import Sidebar from '../Sidebar';

interface ILayoutProps {
  children?: ReactNode | ReactNode[];
  className?: string;
}

const Layout: React.FC<ILayoutProps> = ({ children, className }) => (
  <div className={clsx('h-screen flex flex-col', className)}>
    <Header />
    <div className="flex space-x-4 flex-auto">
      <Sidebar />
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  </div>
);

export default Layout;
