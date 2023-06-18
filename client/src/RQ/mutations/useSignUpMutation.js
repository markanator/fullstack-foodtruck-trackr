import Axios from "../../axios";
import { useMutation } from "@tanstack/react-query";

export const useSignUpMutation = () => useMutation(async (values) => Axios.post(`/users`, values));
