import Axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

export function useTrucksQuery() {
  const queryClient = useQueryClient();
  return useQuery(
    'trucks',
    async () => {
      const trucks = await Axios.get(
        `${process.env.REACT_APP_HOSTED_BACKEND}/trucks`
      ).then((resp) => resp.data);

      trucks.forEach((truck) => {
        queryClient.setQueryData(['truck', truck.id], truck);
      });
      return trucks;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
}
