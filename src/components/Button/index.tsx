import React from 'react';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

export type Color = 'primary' | 'secondary' | 'black' | 'danger';

interface ButtonProps {
  className?: string;
  loading?: boolean;
  children?: any;
  type?: 'button' | 'submit';
  onClick?: any;
  disabled?: boolean;
  color?: Color;
}

const Button: React.FC<ButtonProps> = ({
  className = '',
  children,
  loading = false,
  type = 'button',
  onClick,
  disabled,
  color = 'primary',
}) => {
  const colorMap = {
    primary: 'bg-indigo-500 text-white',
    black: 'bg-black-900 text-white',
    secondary: 'bg-white text-black-300 shadow-secondary-button',
    danger: 'bg-red-600 text-white',
  };

  return (
    <button
      className={clsx(
        'rounded-1.5 h-10 text-sm focus:outline-none hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 px-8',
        className,
        colorMap[color],
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : children}
    </button>
  );
};

export default Button;
