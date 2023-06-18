import { useMutation, useQueryClient } from '@tanstack/react-query';
import Axios from '../../axios';

export function useDeleteMenuItem(truckID) {
  const token = localStorage.getItem('token');
  const queryClient = useQueryClient();

  return useMutation(
    (value) =>
      Axios.delete(
        `/trucks/food/${value}`,
        {
          headers: {
            Authorization: token,
          },
        }
      ),
    {
      onError: (error) => {
        // test
        console.log(error.response.data);
      },
      onSettled: () => queryClient.invalidateQueries(['truck', truckID]),
    }
  );
}
