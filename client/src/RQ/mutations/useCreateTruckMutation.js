import { useMutation, useQueryClient } from 'react-query';
import Axios from 'axios';

export function useCreateTruckMutation() {
  const token = localStorage.getItem('token');
  const queryClient = useQueryClient();

  return useMutation(
    (values) =>
      Axios.post(`${process.env.REACT_APP_HOSTED_BACKEND}/trucks`, values, {
        headers: {
          Authorization: token,
        },
      }),
    {
      onError: (error) => {
        // test
        console.log(error.response.data);
      },
      onSettled: () => queryClient.invalidateQueries('trucks'),
    }
  );
}
