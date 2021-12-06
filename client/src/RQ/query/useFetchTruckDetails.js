import Axios from '../../axios';
import { useQuery } from 'react-query';

export function useFetchTruckDetails(truckID) {
  return useQuery(
    ['truck', parseInt(truckID)],
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
