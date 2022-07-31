import React, { useEffect, useState } from 'react';

import Datepicker from '../components/DatePicker';
import Layout from '../components/Layout';
import Pagination from '../components/Pagination';
import PuppiesTable from '../components/PuppiesTable';
import SearchInput from '../components/SearchInput';
import { usePuppy } from '../contexts/puppy.context';
import useDebounce from '../hooks/useDebounce';

const DashboardPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const {
    fetchPuppies, puppies, totalCount, loading,
  } = usePuppy();

  const debounceSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    fetchPuppies({
      page,
      pageSize,
      searchTerm: debounceSearchTerm,
      startDate,
      endDate,
    });
  }, [page, pageSize, debounceSearchTerm, startDate, endDate]);

  useEffect(() => {
    setPage(1);
  }, [debounceSearchTerm, startDate, endDate]);

  const onRefresh = () => {
    fetchPuppies({
      page,
      pageSize,
      searchTerm: debounceSearchTerm,
      startDate,
      endDate,
    });
  };

  return (
    <Layout>
      <div className="px-6 py-6">
        <h1 className="text-2xl font-semibold mb-4">
          Puppies(
          {totalCount}
          )
        </h1>

        <div className="mb-4 flex justify-between items-end space-x-4">
          <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

          <div className="flex space-x-4">
            <Datepicker label="From" value={startDate} onChange={(date) => setStartDate(date)} />
            <Datepicker label="To" value={endDate} onChange={(date) => setEndDate(date)} />
          </div>
        </div>

        <div className="mb-4">
          <PuppiesTable
            loading={loading}
            puppies={puppies}
            onRefresh={onRefresh}
            showAction={false}
          />
        </div>

        <div className="flex justify-center">
          <Pagination
            totalCount={totalCount}
            pageSize={pageSize}
            curPage={page}
            onChange={setPage}
          />
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
