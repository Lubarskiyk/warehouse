import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOfficeApi } from "@/api/tanstackReactQuery/offices/requests";

export function useOfficeMutation() {
  const queryClient = useQueryClient();

  const createOffice = useMutation({
    mutationFn: createOfficeApi,
    onSuccess: () => {
      alert("success");
    },
    onError: (error) => {
      alert(`error", ${error.message}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["office"] });
    },
  });

  return { createOffice };
}
