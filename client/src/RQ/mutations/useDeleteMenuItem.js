import { useMutation, useQueryClient } from 'react-query';
import Axios from 'axios';

export function useDeleteMenuItem(truckID) {
  const token = localStorage.getItem('token');
  const queryClient = useQueryClient();

  return useMutation(
    (value) =>
      Axios.delete(
        `${process.env.REACT_APP_HOSTED_BACKEND}/trucks/food/${value}`,
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
