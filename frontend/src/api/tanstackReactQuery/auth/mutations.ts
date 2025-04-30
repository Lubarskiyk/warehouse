import { useMutation } from "@tanstack/react-query";
import { loginUserApi } from "@/api/tanstackReactQuery/auth/requests";
import { ILoginCredentials } from "@/types";
import { useAppDispatch } from '@/redax/reduxHooks';
import { authenticated } from '@/redax/auth/slice';

export function useAuth() {
  const dispatch = useAppDispatch();
  const loginMutation = useMutation({
    mutationFn: (credentials: ILoginCredentials) => loginUserApi(credentials),
    onSuccess: ({ data }) => {
      localStorage.setItem("accessToken", data.accessToken);
      dispatch(authenticated(true))
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  return {loginMutation}
}
