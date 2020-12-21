import * as yup from 'yup';

export const SignUpSchema = yup.object().shape({
  first_name: yup
    .string()
    .lowercase()
    .min(2, 'Too short!')
    .required('Required'),
  last_name: yup.string().lowercase().min(2, 'Too short!').required('Required'),
  username: yup
    .string()
    .lowercase()
    .min(5, 'Username is too short!')
    .max(29, 'Too long!')
    .required('Required'),
  email: yup.string().lowercase().email().required('Required'),
  user_role: yup.string().oneOf(['diner', 'operator']).required('Required'),
  password: yup
    .string()
    .min(8, 'Minimum 8 characters requried!')
    .max(32, 'Too long!')
    .required('Required'),
});
