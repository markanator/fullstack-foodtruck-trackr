import Axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

export const useDeleteAccountMutation = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem('token');

  return useMutation(
    async () =>
      Axios.delete(`${process.env.REACT_APP_HOSTED_BACKEND}/user`, {
        headers: {
          Authorization: token,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user');
      },
    }
  );
};
