import React, { ChangeEvent, FocusEventHandler } from 'react';

import clsx from 'clsx';

export interface SearchInputProps {
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  value?: string;
  placeholder?: string;
}

const SearchInput = ({
  className, value, onChange, onBlur, placeholder,
}: SearchInputProps) => (
  <div className={clsx('relative flex flex-col items-center', className)}>
    <input
      name="search"
      placeholder={placeholder || 'Search...'}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className="h-10 shadow placeholder-gray-500 bg-white text-black-200 border border-gray-200 focus:outline-none block w-full rounded-lg px-5 py-2"
    />
  </div>
);

export default SearchInput;
