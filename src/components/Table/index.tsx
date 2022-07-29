import React from 'react';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Column {
  label: string;
  value: string;
  className?: string;
  render: any;
}

export interface TableProps {
  columns: Column[];
  data: any[];
  className?: string;
  emptyMessage?: string;
  loading?: boolean;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  className,
  emptyMessage = 'No Data',
  loading,
}: TableProps) => (
  <div className="w-full overflow-x-auto">
    <table className={className}>
      <thead>
        <tr className="border-b">
          {columns.map((column) => (
            <th
              key={column.value}
              className={`uppercase whitespace-nowrap text-left p-2 text-black-400 text-sm min-w-20 pr-4 ${column.className}`}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={columns.length} className="py-5">
              <div className="flex justify-center">
                <FontAwesomeIcon icon={faSpinner} className="w-6 h-6 animate-spin-slow" size="lg" />
              </div>
            </td>
          </tr>
        ) : (
          <>
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="py-5 text-base text-center">
                  {emptyMessage}
                </td>
              </tr>
            )}
            {data.map((item, index) => (
              <tr key={item.id || index} className="border-b last:border-b-0">
                {columns.map((column, idx: number) => (
                  <td key={idx} className="text-left p-2">
                    {column.render(item[column.value], item)}
                  </td>
                ))}
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  </div>
);
