import React, { useEffect, useState } from 'react';

import Button from '../components/Button';
import Layout from '../components/Layout';
import WaitListsView from '../components/WaitListsView';
import { useWaitList } from '../contexts/waitList.context';

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const {
    createWaitList,
    isCreating,
    waitLists,
    totalCount,
    canCreateWaitList,
    fetchWaitLists,
    findWaitListByDate,
    loading,
  } = useWaitList();

  useEffect(() => {
    findWaitListByDate();
  }, []);

  useEffect(() => {
    fetchWaitLists({
      page,
      pageSize,
    });
  }, [page, pageSize]);

  const onCreate = async () => {
    try {
      await createWaitList();
      fetchWaitLists({
        page,
        pageSize,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="px-6 py-6">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-semibold">
            Wait Lists(
            {totalCount}
            )
          </h1>
          <Button
            onClick={onCreate}
            loading={isCreating}
            disabled={!canCreateWaitList}
          >
            Create waiting list
          </Button>
        </div>

        <WaitListsView
          waitLists={waitLists}
          totalCount={totalCount}
          page={page}
          pageSize={pageSize}
          onChangePage={setPage}
          loading={loading}
        />
      </div>
    </Layout>
  );
};

export default HomePage;
