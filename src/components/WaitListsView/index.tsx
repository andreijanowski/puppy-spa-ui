import React from 'react';

import { IWaitList } from '../../interfaces';
import Loader from '../Loader';
import Pagination from '../Pagination';
import WaitListItem from '../WaitListItem';

interface WaitListsViewProps {
  waitLists: IWaitList[];
  totalCount: number;
  page: number;
  pageSize: number;
  onChangePage: (page: number) => void;
  loading?: boolean;
}

const WaitListsView: React.FC<WaitListsViewProps> = ({
  waitLists,
  totalCount,
  page,
  pageSize,
  onChangePage,
  loading,
}) => (
  <div>
    {
      loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader />
        </div>
      ) : (
        <>
          {
            waitLists.map((waitList) => (
              <WaitListItem key={waitList.id} waitList={waitList} />
            ))
          }
        </>
      )
    }

    <div className="flex justify-center">
      <Pagination
        totalCount={totalCount}
        pageSize={pageSize}
        curPage={page}
        onChange={onChangePage}
      />
    </div>
  </div>
);

export default WaitListsView;
