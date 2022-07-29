import * as Yup from 'yup';

export const CreatePuppySchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  owner: Yup.string().required('Name is required'),
  service: Yup.string().required('Name is required'),
  arriveAt: Yup.string().required('Name is required'),
});
