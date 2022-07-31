import React, { Fragment, useRef } from 'react';

import { Dialog, Transition } from '@headlessui/react';

interface IModalProps {
  isOpen: boolean;
  onClose?: any;
  children?: any;
}

export const Modal = ({ isOpen, onClose, children }: IModalProps) => {
  const focusRef = useRef(null);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          initialFocus={focusRef}
          className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-80 transition-opacity"
          onClose={onClose}
        >
          <div className="min-h-screen text-center flex items-center justify-center" ref={focusRef}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            <span
              className="inline-block align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {children}
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
