import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "@/api/tanstackReactQuery/users/requests";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
  });
};

export const useAllUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
  });
};
