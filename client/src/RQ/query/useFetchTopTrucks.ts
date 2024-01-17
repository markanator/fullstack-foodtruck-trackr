import Axios from '../../axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export interface Truck {
  id: string;
  name: string;
  slug: string;
  published: boolean;
  cuisineType: string;
  description: string;
  priceRange: string;
  phone: string;
  views: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  addressId: string;
}

export function useFetchTopTrucks(amount = 3) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['topTrucks', amount],
    queryFn: async () => {
      const trucks = await Axios.get<Truck[]>(`/api/trucks/top/${amount}`).then(
        (resp) => resp.data,
      );

      trucks.forEach((truck) => {
        queryClient.setQueryData(['truck', truck.id], truck);
      });

      return trucks;
    },
    gcTime: 5 * 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
