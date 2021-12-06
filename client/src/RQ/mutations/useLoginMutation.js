import Axios from '../../axios';
import { useMutation } from 'react-query';

export const useLoginMutation = () =>
  useMutation(async (values) =>
    Axios.post(
      '/user/auth/login',
      values
    )
  );
