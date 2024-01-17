import Axios from '../../axios';
import { useQuery } from '@tanstack/react-query';

export interface TopCuisines {
  cuisineType: string;
  _count: { cuisineType: number };
}

export function useFetchTopCuisines(amount = 3) {
  return useQuery({
    queryKey: ['top-cuisines', amount],
    queryFn: async () => {
      const { data } = await Axios.get<TopCuisines[]>(`/api/trucks/top-cuisine/${amount}`);
      console.log(data);
      return data;
    },
    // cacheTime: 5 * 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
