import Axios from "../../axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useTrucksQuery(page = 1) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["trucks", page],
    queryFn: async () => {
      const res = await Axios.get(`/api/trucks?page=${page}`).then(
        (resp) => resp.data
      );

      const { trucks } = res.data;
      trucks.forEach((truck: any) => {
        queryClient.setQueryData(["truck", truck.id], truck);
      });

      return trucks;
    },
    // keepPreviousData: true,
    // cacheTime: 3 * 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  }
  );
}
