import Axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

export const useRemoveFavoriteMutation = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem('token');

  return useMutation(
    async (id) =>
      Axios.delete(
        `${process.env.REACT_APP_HOSTED_BACKEND}/trucks/favorites/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user');
      },
    }
  );
};
