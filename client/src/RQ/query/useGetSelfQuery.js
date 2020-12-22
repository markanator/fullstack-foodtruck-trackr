import Axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

export function useGetSelfQuery() {
  const token = localStorage.getItem('token');
  const queryClient = useQueryClient();
  return useQuery('user', async () => {
    const res = await Axios.get(
      `${process.env.REACT_APP_HOSTED_BACKEND}/user`,
      {
        headers: {
          Authorization: token,
        },
      }
    ).then((resp) => resp.data);

    const trucks =
      res.user_role === 'operator' ? res.ownedTrucks : res.favoriteTrucks;

    trucks.forEach((truck) => {
      queryClient.setQueryData(['truck', truck.id], truck);
    });

    return res;
  });
}
