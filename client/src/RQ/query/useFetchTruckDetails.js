import Axios from 'axios';
import { useQuery } from 'react-query';

export function useFetchTruckDetails(truckID) {
  return useQuery(
    ['truck', parseInt(truckID)],
    async () =>
      Axios.get(
        `${process.env.REACT_APP_HOSTED_BACKEND}/trucks/${truckID}`
      ).then((res) => res.data),
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );
}
