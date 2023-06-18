import Axios from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteAccountMutation = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  return useMutation(
    async () =>
      Axios.delete("/users", {
        headers: {
          Authorization: token,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user");
      },
    }
  );
};
