import React, { useCallback, useMemo } from 'react';

import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

import { usePuppy } from '../../contexts/puppy.context';
import { IPuppy } from '../../interfaces';
import { Checkbox } from '../Checkbox';
import { Table } from '../Table';

interface PuppiesTableProps {
  puppies: IPuppy[];
  onRefresh: () => void;
  loading?: boolean;
  showAction?: boolean;
}

const PuppiesTable: React.FC<PuppiesTableProps> = ({
  puppies,
  onRefresh,
  loading,
  showAction = true,
}) => {
  const { updatePuppy, reorderPuppy } = usePuppy();

  const onUpdate = useCallback(async (id: string, data: any) => {
    try {
      await updatePuppy(id, data);
      await onRefresh();
    } catch (err) {
      console.error(err);
    }
  }, [onRefresh]);

  const onReorder = useCallback(async (id: string, action: string) => {
    try {
      await reorderPuppy(id, action);
      await onRefresh();
    } catch (err) {
      console.error(err);
    }
  }, [onRefresh]);

  const columns = useMemo(() => [
    {
      label: 'Name',
      value: 'name',
      render: (text: string) => (
        <div>
          {text}
        </div>
      ),
    },
    {
      label: 'Owner',
      value: 'owner',
      render: (text: string) => (
        <div>
          {text}
        </div>
      ),
    },
    {
      label: 'Service',
      value: 'service',
      render: (text: string) => (
        <div>
          {text}
        </div>
      ),
    },
    {
      label: 'Arrive At',
      value: 'arriveAt',
      render: (text: string) => (
        <div>
          {moment(text).format('MMMM DD, YYYY')}
        </div>
      ),
    },
    {
      label: 'Served',
      value: 'isEnded',
      className: 'w-0',
      render: (isEnded: boolean, row: any) => (
        <div className="block text-center">
          <Checkbox
            value={isEnded}
            onChange={(value) => onUpdate(row.id, { isEnded: value })}
          />
        </div>
      ),
    },
    ...showAction ? [{
      label: 'Actions',
      value: 'actions',
      className: 'w-0',
      render: (_: any, row: any) => (
        <div className="flex space-x-2">
          <div
            className="px-2 py-1 cursor-pointer hover:bg-gray-100 rounded"
            onClick={() => onReorder(row.id, 'up')}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </div>
          <div
            className="px-2 py-1 cursor-pointer hover:bg-gray-100 rounded"
            onClick={() => onReorder(row.id, 'down')}
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
        </div>
      ),
    }] : [],
  ], [onUpdate, showAction]);

  return (
    <div>
      <Table className="w-full" columns={columns} data={puppies} loading={loading} />
    </div>
  );
};

export default PuppiesTable;
