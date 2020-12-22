import { useMutation, useQueryClient } from 'react-query';
import Axios from 'axios';

export function useEditTruckMutation(id) {
  const token = localStorage.getItem('token');
  const queryClient = useQueryClient();

  return useMutation(
    (values) =>
      Axios.put(
        `${process.env.REACT_APP_HOSTED_BACKEND}/trucks/${id}`,
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
      onSettled: () => queryClient.invalidateQueries('trucks'),
    }
  );
}
