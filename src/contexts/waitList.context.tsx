import React, { useState } from 'react';

import moment from 'moment';

import { IWaitList } from '../interfaces';
import * as WaitListApi from '../services/waitList.service';

const WaitListContext = React.createContext({} as any);

function WaitListProvider(props: any) {
  const [waitLists, setWaitLists] = useState<IWaitList[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [canCreateWaitList, setCanCreateWaitList] = useState<boolean>(true);

  const fetchWaitLists = async (params: any) => {
    try {
      setLoading(true);
      const res = await WaitListApi.getWaitLists(params);

      setWaitLists(res.data);
      setTotalCount(res.totalCount);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createWaitList = async () => {
    try {
      setIsCreating(true);
      await WaitListApi.createWaitList({ date: moment().format('YYYY-MM-DD') });
    } catch (err) {
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  const findWaitListByDate = async () => {
    try {
      setLoading(true);
      const res = await WaitListApi.findWaitListByDate(moment().format('YYYY-MM-DD'));

      if (res) {
        setCanCreateWaitList(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <WaitListContext.Provider
      value={{
        fetchWaitLists,
        waitLists,
        totalCount,
        loading,
        createWaitList,
        isCreating,
        canCreateWaitList,
        setCanCreateWaitList,
        findWaitListByDate,
      }}
      {...props}
    />
  );
}

function useWaitList() {
  const context = React.useContext(WaitListContext);

  if (context === undefined) {
    throw new Error('useWaitList must be used within a WaitListProvider');
  }
  return context;
}

export { WaitListProvider, useWaitList };
