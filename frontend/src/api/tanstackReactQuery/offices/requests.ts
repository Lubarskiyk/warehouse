import { api } from '@/api/axios/api';


export const fetchOfficeAll = async () => {
  return await api.get(`/office`);
};