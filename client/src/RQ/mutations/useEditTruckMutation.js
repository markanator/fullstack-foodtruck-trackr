import { useMutation, useQueryClient } from '@tanstack/react-query';
import Axios from '../../axios';

export function useEditTruckMutation(id) {
  const token = localStorage.getItem('token');
  const queryClient = useQueryClient();

  return useMutation(
    (values) =>
      Axios.put(
        `/trucks/${id}`,
        values,
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
      onSettled: () => queryClient.invalidateQueries(['truck', id]),
    }
  );
}
