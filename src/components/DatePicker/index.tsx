import React, { forwardRef, LegacyRef } from 'react';

import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.min.css';

const DateInput = forwardRef((props: any, ref: LegacyRef<any>) => (
  <div className="relative h-full">
    <input
      ref={ref}
      className={clsx(
        'focus:border-green-400 border-transparent h-12 placeholder-gray-500 py-2.5 px-3 bg-gray-100 text-gray-500 focus:text-purple-700 border border-transparent focus:outline-none block min-w-40 w-full shadow-sm sm:text-base rounded-md',
      )}
      {...props}
    />
    <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
      <FontAwesomeIcon icon={faCalendar} className="text-gray-350" />
    </div>
  </div>
));

interface IDatepickerProps {
  label?: string;
  value: Date;
  onChange: (date: Date, event: React.SyntheticEvent) => void;
  className?: string;
}

const Datepicker: React.FC<IDatepickerProps> = ({
  label,
  value,
  onChange,
  className,
}) => (
  <div className={className}>
    <div className="text-left block text-base font-regular text-blue-dark-700 mb-1">
      {label}
    </div>
    <ReactDatePicker
      className="border border-gray-300 w-full py-2 px-4 rounded shadow h-10"
      selected={value}
      onChange={onChange}
      customInput={<DateInput />}
    />
  </div>
);

export default Datepicker;
