import * as yup from 'yup';

const FILE_SIZE = 2 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

export const CreateMenuItemSchema = yup.object().shape({
  item_name: yup.string().required('Required!'),
  item_description: yup
    .string()
    .min(10, 'Description too short!')
    .max(144, 'Description too long!')
    .required('Required!'),
  item_price: yup
    .number()
    .max(50, 'Price too high, please contact support.')
    .required('Required!'),
});
