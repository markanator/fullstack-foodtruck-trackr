import { useAuth } from '@clerk/clerk-react';
import Axios from '../../axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export function useGetSelfQuery() {
  const { getToken, userId } = useAuth();
  // const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const token = await getToken();
      const res = await Axios.get(`/api/users`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((resp) => resp.data);

      const trucks = res.user_role === 'operator' ? res.ownedTrucks : res.favoriteTrucks;

      trucks.forEach((truck) => {
        queryClient.setQueryData(['truck', truck.id], truck);
      });

      return res;
    },
  });
}
