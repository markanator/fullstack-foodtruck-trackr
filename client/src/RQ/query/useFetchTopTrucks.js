import Axios from '../../axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export function useFetchTopTrucks(amount = 3) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['topTrucks', amount],
    queryFn: async () => {
      const trucks = await Axios.get(
        `/api/trucks/top/${amount}`
      ).then((resp) => resp.data);
  
      trucks.forEach((truck) => {
        queryClient.setQueryData(['truck', truck.id], truck);
      });
  
      return trucks;
    },
    cacheTime: 5 * 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  }
  );
}
