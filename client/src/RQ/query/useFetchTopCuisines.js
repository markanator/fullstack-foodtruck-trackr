import Axios from '../../axios';
import { useQuery } from '@tanstack/react-query';

export function useFetchTopCuisines(amount = 3) {
  return useQuery({
    queryKey: ['top-cuisines', amount],
    queryFn: async () => {
      const { data } = await Axios.get(`/api/trucks/top-cuisine/${amount}`);
      return data;
    },
    cacheTime: 5 * 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  }
  );
}
