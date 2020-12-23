import * as yup from 'yup';

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
