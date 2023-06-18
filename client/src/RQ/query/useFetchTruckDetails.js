import Axios from '../../axios';
import { useQuery } from '@tanstack/react-query';

export function useFetchTruckDetails(truckID) {
  return useQuery(
    ['truck', truckID],
    async () =>
      Axios.get(
        `/trucks/${truckID}`
      ).then((res) => res.data),
    {
      onError: (err) => {
        console.log(err);
      },
      cacheTime: 3 * 24 * 60 * 60 * 1000,
    }
  );
}
