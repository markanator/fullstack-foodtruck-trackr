import Axios from "../../axios";
import { useMutation } from "react-query";

export const useLoginMutation = () => useMutation(async (values) => Axios.post("/users/auth/login", values));
