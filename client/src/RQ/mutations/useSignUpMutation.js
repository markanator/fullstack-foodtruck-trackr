import Axios from '../../axios';
import { useMutation } from 'react-query';

export const useSignUpMutation = () =>
  useMutation(async (values) =>
    Axios.post(`/user`, values)
  );
