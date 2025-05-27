import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  loginUserApi,
  logoutUserApi,
} from "@/api/tanstackReactQuery/auth/requests";
import { ILoginCredentials } from "@/types";
import { useAppDispatch } from "@/redax/reduxHooks";
import { authenticated } from "@/redax/auth/slice";
import { AxiosError } from "axios";


export function useAuth() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (credentials: ILoginCredentials) => loginUserApi(credentials),
    onSuccess: ({ data }) => {
      localStorage.setItem("accessToken", data.accessToken);
      dispatch(authenticated(true));
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{
        message?: string;
        statusCode?: number;
      }>;
      console.error("Login failed:", axiosError.response?.data?.statusCode);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUserApi,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      dispatch(authenticated(false));

    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  return { loginMutation, logoutMutation };
}
