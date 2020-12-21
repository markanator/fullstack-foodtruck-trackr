import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  email: yup.string().lowercase().email().required(),
  password: yup.string().min(8, 'Minimum 8 characters requried!').required(),
});
