import Axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

export function useFetchTopTrucks(amount = 3) {
  const queryClient = useQueryClient();

  return useQuery(
    'topTrucks',
    async () => {
      const trucks = await Axios.get(
        `${process.env.REACT_APP_HOSTED_BACKEND}/trucks/top/${amount}`
      ).then((resp) => resp.data);

      trucks.forEach((truck) => {
        queryClient.setQueryData(['truck', truck.id], truck);
      });

      return trucks;
    },
    {
      cacheTime: 5 * 24 * 60 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );
}
