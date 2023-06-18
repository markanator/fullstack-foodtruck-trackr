import Axios from '../../axios';
import { useQuery } from '@tanstack/react-query';

export function useFetchTopCuisines(amount = 3) {
  return useQuery(
    ['categories', amount],
    async () =>
      Axios.get(
        `/trucks/top-cuisine/${amount}`
      ).then((resp) => resp.data),
    {
      cacheTime: 5 * 24 * 60 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );
}
