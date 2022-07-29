import React, { ChangeEvent } from 'react';

import clsx from 'clsx';

export interface InputProps {
  type?: string;
  label?: string;
  className?: string;
  name?: string;
  onChange?: (e: ChangeEvent) => void;
  onBlur?: (e: any) => void;
  onFocus?: (e: any) => void;
  value?: string;
  helperText?: any;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  label = '',
  className = '',
  name,
  onChange,
  onBlur,
  onFocus,
  value,
  helperText,
  placeholder,
}) => {
  const handleBlur = (e: any) => {
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <div className={`w-full text-black-200 ${className}`}>
      {label && (
        <label className="block mb-2 text-sm" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        className={clsx(
          'h-10 text-gray-700 focus:ring-indigo-900 focus:border-0 focus:ring-2 focus:outline-none rounded-1.5 px-4 w-full border border-gray-300 shadow-input text-sm',
          helperText && '!text-red-500 !border-red-500 focus:ring-red-500',
        )}
        onFocus={onFocus}
        onBlur={handleBlur}
        onChange={onChange}
      />
      {!!helperText && (
      <div className="text-red-500 text-xxs mt-2 text-left">
        *
        {helperText}
      </div>
      )}
    </div>
  );
};

export default Input;
