import Axios from "../../axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useTrucksQuery(page = 1) {
  const queryClient = useQueryClient();
  return useQuery(
    ["trucks", "page", page],
    async () => {
      const res = await Axios.get(`/trucks?page=${page}`).then(
        (resp) => resp.data
      );

      queryClient.setQueryData(["pageInfo"], res.info);
      // console.log('trucks query', res);

      const { trucks } = res.data;
      trucks.forEach((truck: any) => {
        queryClient.setQueryData(["truck", truck.id], truck);
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
