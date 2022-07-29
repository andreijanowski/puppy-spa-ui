import React, { useMemo } from 'react';

import { faChevronLeft, faChevronRight, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

interface IPageButtonProps {
  page: number;
  active?: boolean;
  onChange: (page: number) => void;
}

const PageButton = ({ page, active = false, onChange }: IPageButtonProps) => (
  <button
    className={clsx(
      'focus:outline-none px-2 w-8 h-8 border border-gray-500 flex items-center justify-center rounded',
      active ? 'bg-blue-600 text-white' : '',
    )}
    onClick={() => onChange(page)}
  >
    {page}
  </button>
);

interface IPaginationProps {
  totalCount: number;
  pageSize: number;
  curPage: number;
  onChange: (page: number) => void;
}

const Pagination = ({
  totalCount, pageSize = 10, curPage, onChange,
}: IPaginationProps) => {
  const pageCount = useMemo(() => Math.ceil(totalCount / pageSize), [pageSize, totalCount]);

  const onPrev = () => {
    if (curPage > 1) {
      onChange(curPage - 1);
    }
  };

  const onNext = () => {
    if (curPage < pageCount) {
      onChange(curPage + 1);
    }
  };

  return (
    <div className="inline-flex space-x-1">
      <button
        className="focus:outline-none disabled:text-gray-400 px-2 w-8 h-8 border border-gray-500 flex items-center rounded"
        onClick={onPrev}
        disabled={curPage === 1}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" />
      </button>
      {pageCount <= 5 ? (
        <>
          {[...Array(pageCount)].map((_, index) => (
            <PageButton
              key={index + 1}
              page={index + 1}
              onChange={onChange}
              active={index + 1 === curPage}
            />
          ))}
        </>
      ) : (
        <>
          {curPage < 5 ? (
            [...Array(Math.min(5, pageCount))].map((_, index) => (
              <PageButton
                key={index}
                page={index + 1}
                onChange={onChange}
                active={index + 1 === curPage}
              />
            ))
          ) : (
            <>
              <PageButton page={1} onChange={onChange} />
              <button className="focus:outline-none w-8 h-8 flex justify-center items-center rounded">
                <FontAwesomeIcon icon={faEllipsisH} className="w-3 h-3" />
              </button>
            </>
          )}
          {curPage >= 5 && curPage <= pageCount - 5 && (
            <>
              <PageButton page={curPage - 1} onChange={onChange} />
              <PageButton page={curPage} onChange={onChange} active />
              <PageButton page={curPage + 1} onChange={onChange} />
            </>
          )}
          {curPage > pageCount - 5 && curPage > 4 ? (
            [...Array(Math.max(5, pageCount - curPage))].map((_, idx) => (
              <PageButton
                key={pageCount - 4 + idx}
                page={pageCount - 4 + idx}
                onChange={onChange}
                active={pageCount - 4 + idx === curPage}
              />
            ))
          ) : (
            <>
              <button className="focus:outline-none w-8 h-8 flex justify-center items-center rounded">
                <FontAwesomeIcon icon={faEllipsisH} className="w-3 h-3" />
              </button>
              <PageButton page={pageCount} onChange={onChange} />
            </>
          )}
        </>
      )}
      <button
        className="focus:outline-none disabled:text-gray-400 px-2 w-8 h-8 border border-gray-500 flex items-center rounded"
        onClick={onNext}
        disabled={curPage === pageCount}
      >
        <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
      </button>
    </div>
  );
};

export default Pagination;
