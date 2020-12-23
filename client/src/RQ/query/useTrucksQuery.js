import Axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

export function useTrucksQuery(page) {
  const queryClient = useQueryClient();
  return useQuery(
    ['page', page],
    async () => {
      const res = await Axios.get(
        `${process.env.REACT_APP_HOSTED_BACKEND}/trucks?page=${page}`
      ).then((resp) => resp.data);

      queryClient.setQueryData('pageInfo', res.info);
      // console.log('trucks query', res);

      const { trucks } = res;
      trucks.forEach((truck) => {
        queryClient.setQueryData(['truck', truck.id], truck);
      });

      return trucks;
    },
    {
      keepPreviousData: true,
      cacheTime: 3 * 24 * 60 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );
}
