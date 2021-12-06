import Axios from '../../axios';
import { useMutation, useQueryClient } from 'react-query';

export const useOwnerDeleteTruck = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem('token');

  return useMutation(
    async (truckID) =>
      Axios.delete(
        `/trucks/${truckID}`,
        {
          headers: {
            Authorization: token,
          },
        }
      ),
    {
      onSettled: () => queryClient.invalidateQueries('user'),
    }
  );
};
