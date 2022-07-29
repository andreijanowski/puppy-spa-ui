import React from 'react';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

const menus = [
  {
    label: 'WaitLists',
    path: '/wait-lists',
  },
  {
    label: 'Puppies',
    path: '/puppies',
  },
];

const Sidebar = () => {
  const router = useRouter();

  const isActive = (path: string) => router.pathname === path;

  return (
    <div className="max-w-76 min-w-68 flex flex-col shadow-xl border-r px-4 py-4">
      {
        menus.map((item, index) => (
          <Link
            href={item.path}
            key={index}
          >
            <div className={clsx('cursor-pointer hover:bg-gray-100 rounded-md py-2 px-4 mb-3', isActive(item.path) ? 'bg-gray-100' : '')}>
              {item.label}
            </div>
          </Link>
        ))
      }
    </div>
  );
};

export default Sidebar;
