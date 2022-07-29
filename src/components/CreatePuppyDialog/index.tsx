import React, { useEffect } from 'react';

import { useFormik } from 'formik';

import { usePuppy } from '../../contexts/puppy.context';
import { CreatePuppySchema } from '../../shared/schemas';
import Button from '../Button';
import Datepicker from '../DatePicker';
import Input from '../Input';
import { Modal } from '../Modal';

interface ICreatePuppyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  waitList: string;
  onRefresh: () => void;
}

const CreatePuppyDialog: React.FC<ICreatePuppyDialogProps> = ({
  isOpen,
  onClose,
  waitList,
  onRefresh,
}) => {
  const { createPuppy, isCreating } = usePuppy();

  const onSubmit = async (values: any) => {
    try {
      await createPuppy({
        ...values,
        waitList,
      });
      await onRefresh();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const form = useFormik({
    initialValues: {
      owner: '',
      name: '',
      service: '',
      arriveAt: new Date(),
    },
    validationSchema: CreatePuppySchema,
    onSubmit,
    validateOnMount: true,
  });

  useEffect(() => {
    if (isOpen) {
      form.setValues({
        owner: '',
        name: '',
        service: '',
        arriveAt: new Date(),
      });
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="min-w-120 relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex justify-between items-start py-4 px-6 rounded-t border-b dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Create New Puppy
          </h3>
        </div>
        <div className="p-6">
          <form onSubmit={form.handleSubmit}>
            <Input
              placeholder="Owner"
              className="mb-4"
              {...form.getFieldProps('owner')}
              helperText={form.touched.owner ? form.errors.owner : ''}
            />

            <Input
              placeholder="Puppy Name"
              className="mb-4"
              {...form.getFieldProps('name')}
              helperText={form.touched.name ? form.errors.name : ''}
            />

            <Input
              placeholder="Service"
              className="mb-4"
              {...form.getFieldProps('service')}
              helperText={form.touched.service ? form.errors.service : ''}
            />

            <Datepicker
              label="Arrive At"
              className="mb-3"
              {...form.getFieldProps('arriveAt')}
              onChange={(date) => form.setFieldValue('arriveAt', date)}
            />

            <div className="flex justify-end space-x-4 mt-6">
              <Button
                type="submit"
                className="px-8 py-1.5 min-w-40 font-semibold"
                color="primary"
                disabled={!form.isValid}
                loading={isCreating}
              >
                Save
              </Button>
              <Button
                className="px-8 py-1.5 min-w-40 font-semibold"
                color="danger"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CreatePuppyDialog;
