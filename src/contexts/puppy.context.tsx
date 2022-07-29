import React, { useState } from 'react';

import { IPuppy } from '../interfaces';
import * as PuppyApi from '../services/puppy.service';

const PuppyContext = React.createContext({} as any);

function PuppyProvider(props: any) {
  const [puppies, setPuppies] = useState<IPuppy[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const fetchPuppies = async (params: any) => {
    try {
      setLoading(true);
      const res = await PuppyApi.getPuppies(params);

      setPuppies(res.data);
      setTotalCount(res.totalCount);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createPuppy = async (data: any) => {
    try {
      setIsCreating(true);
      await PuppyApi.createPuppy(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  const updatePuppy = async (id: string, data: any) => {
    try {
      setIsUpdating(true);
      await PuppyApi.updatePuppy(id, data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const reorderPuppy = async (id: string, action: string) => {
    try {
      setIsUpdating(true);
      await PuppyApi.reorderPuppy(id, action);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <PuppyContext.Provider
      value={{
        fetchPuppies,
        puppies,
        totalCount,
        loading,
        createPuppy,
        isCreating,
        updatePuppy,
        isUpdating,
        reorderPuppy,
      }}
      {...props}
    />
  );
}

function usePuppy() {
  const context = React.useContext(PuppyContext);

  if (context === undefined) {
    throw new Error('usePuppy must be used within a PuppyProvider');
  }
  return context;
}

export { PuppyProvider, usePuppy };
