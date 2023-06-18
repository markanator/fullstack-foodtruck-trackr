import Axios from '../../axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRemoveFavoriteMutation = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem('token');

  return useMutation(
    async (id) =>
      Axios.delete(
        `/trucks/favorites/${id}`,
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
