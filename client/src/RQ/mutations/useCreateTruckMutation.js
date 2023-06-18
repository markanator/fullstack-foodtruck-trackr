import { useMutation, useQueryClient } from '@tanstack/react-query';
import Axios from '../../axios';

export function useCreateTruckMutation() {
  const token = localStorage.getItem('token');
  const queryClient = useQueryClient();

  return useMutation(
    (values) =>
      Axios.post('/trucks', values, {
        headers: {
          Authorization: token,
        },
      }),
    {
      onError: (error) => {
        // test
        console.log(error.response.data);
      },
      onSettled: () => queryClient.invalidateQueries('truck'),
    }
  );
}
