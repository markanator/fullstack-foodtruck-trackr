import Axios from "../../axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetSelfQuery() {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();
  return useQuery(
    ["user"],
    async () => {
      const res = await Axios.get(`/users`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((resp) => resp.data);

      const trucks = res.user_role === "operator" ? res.ownedTrucks : res.favoriteTrucks;

      trucks.forEach((truck) => {
        queryClient.setQueryData(["truck", truck.id], truck);
      });

      return res;
    },
    {
      cacheTime: 5 * 24 * 60 * 60 * 1000,
    }
  );
}
