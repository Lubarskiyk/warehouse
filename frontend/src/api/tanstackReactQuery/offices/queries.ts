import { useQuery } from "@tanstack/react-query";
import { fetchOfficeAll, fetchOfficeById } from '@/api/tanstackReactQuery/offices/requests';


export const useOffices = () => {
  return useQuery({
    queryKey: ["offices"],
    queryFn: fetchOfficeAll,
  });
};


export const useOffice = (officeId:string) => {
  return useQuery({
    queryKey: ["offices", officeId],
    queryFn: () => fetchOfficeById(officeId),
    enabled: !!officeId,
  });
};
