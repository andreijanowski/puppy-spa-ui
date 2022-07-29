import React, { useState } from 'react';

import { IWaitList } from '../../interfaces';
import Button from '../Button';
import CreatePuppyDialog from '../CreatePuppyDialog';

interface CreatePuppyButtonProps {
  waitList: IWaitList;
  onRefresh: () => void;
}

const CreatePuppyButton: React.FC<CreatePuppyButtonProps> = ({
  waitList,
  onRefresh,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button
        color="primary"
        onClick={() => setIsOpen(true)}
      >
        Create Puppy
      </Button>

      <CreatePuppyDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        waitList={waitList.id}
        onRefresh={onRefresh}
      />
    </div>
  );
};

export default CreatePuppyButton;
