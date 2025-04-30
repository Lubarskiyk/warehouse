import { useMutation } from "@tanstack/react-query";
import { loginUserApi } from "@/api/tanstackReactQuery/auth/requests";
import { ILoginCredentials } from "@/types";
import { useAppDispatch } from '@/redax/reduxHooks';
import { authenticated } from '@/redax/auth/slice';
import { AxiosError } from 'axios';

export function useAuth() {
  const dispatch = useAppDispatch();
  const loginMutation = useMutation({
    mutationFn: (credentials: ILoginCredentials) => loginUserApi(credentials),
    onSuccess: ({ data }) => {
      localStorage.setItem("accessToken", data.accessToken);
      dispatch(authenticated(true))
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ message?: string, statusCode?:number }>;
      console.error("Login failed:", axiosError.response?.data?.statusCode);
    },
  });

  return {loginMutation}
}
