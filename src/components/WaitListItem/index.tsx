import React, { useCallback, useEffect, useState } from 'react';

import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import moment from 'moment';

import { IPuppy, IWaitList } from '../../interfaces';
import * as PuppyApi from '../../services/puppy.service';
import CreatePuppyButton from '../CreatePuppyButton';
import PuppiesTable from '../PuppiesTable';

interface WaitListItemProps {
  waitList: IWaitList;
}

const WaitListItem: React.FC<WaitListItemProps> = ({
  waitList,
}) => {
  const [collapse, setCollapse] = useState(false);
  const [puppies, setPuppies] = useState<IPuppy[]>([]);

  const getPuppies = useCallback(async () => {
    try {
      const res = await PuppyApi.getPuppies({ waitList: waitList.id });
      setPuppies(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (collapse) {
      (async () => {
        await getPuppies();
      })();
    }
  }, [collapse, waitList]);

  return (
    <div className="shadow rounded-lg border border-gray-200 mb-4">
      <div
        className={clsx('flex justify-between items-center cursor-pointer p-4', collapse ? 'border-b border-gray-200' : '')}
        onClick={() => setCollapse(!collapse)}
      >
        <div>
          <span className="mr-2">
            {moment(waitList.date).format('MMMM DD, YYYY')}
          </span>
        </div>

        <FontAwesomeIcon icon={collapse ? faChevronUp : faChevronDown} />
      </div>
      {
        collapse && (
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-semibold">
                Puppies for
                {' '}
                {moment(waitList.date).format('MMMM DD, YYYY')}
              </div>
              {
                moment().format('YYYY-MM-DD') === waitList.date && (
                  <CreatePuppyButton waitList={waitList} onRefresh={getPuppies} />
                )
              }
            </div>
            <PuppiesTable puppies={puppies} onRefresh={getPuppies} />
          </div>
        )
      }
    </div>
  );
};

export default WaitListItem;
