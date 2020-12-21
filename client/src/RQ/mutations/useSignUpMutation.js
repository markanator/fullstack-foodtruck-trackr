import Axios from 'axios';
import { useMutation } from 'react-query';

export const useSignUpMutation = () =>
  useMutation(async (values) =>
    Axios.post(`${process.env.REACT_APP_HOSTED_BACKEND}/user`, values)
  );
