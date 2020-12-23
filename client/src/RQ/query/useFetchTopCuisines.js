import Axios from 'axios';
import { useQuery } from 'react-query';

export function useFetchTopCuisines(amount = 3) {
  return useQuery(
    'categories',
    async () =>
      Axios.get(
        `${process.env.REACT_APP_HOSTED_BACKEND}/trucks/top-cuisine/${amount}`
      ).then((resp) => resp.data),
    {
      cacheTime: 5 * 24 * 60 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );
}
