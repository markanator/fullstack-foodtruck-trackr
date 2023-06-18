import Axios from "../../axios";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => useMutation(async (values) => Axios.post("/users/auth/login", values));
