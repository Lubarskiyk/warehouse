import { useQuery } from '@tanstack/react-query';
import { fetchOfficeAll } from '@/api/tanstackReactQuery/offices/requests';

export const useOffice = () => {
  return useQuery({
    queryKey: ["office"],
    queryFn: fetchOfficeAll,
  });
};

