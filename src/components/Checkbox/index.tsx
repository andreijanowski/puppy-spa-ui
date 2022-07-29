import React from 'react';

export interface CheckboxProps {
  type?: string;
  label?: any;
  className?: string;
  value: boolean;
  onChange: (val: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className,
  value,
  onChange,
}: CheckboxProps) => (
  <label className={`relative cursor-pointer rounded-sm ${className}`}>
    <input
      className="absolute opacity-0"
      type="checkbox"
      checked={value}
      onChange={(e) => onChange(e.target.checked)}
    />
    <span
      className={`absolute top-1/2 rounded-sm transform -translate-y-1/2 left-0 h-4 w-4 border border-gray-400 ${
        value && 'bg-blue-600 border-0'
      }`}
    >
      {value && (
        <span className="absolute left-1.5 top-0.5 w-[5px] h-[10px] transform rotate-45 border-b-2 border-r-2 border-white" />
      )}
    </span>
    <span className="text-sm pl-5">{label}</span>
  </label>
);
