import { api } from '@/api/axios/api';


export const fetchOfficeAll = async () => {
  return await api.get(`/office`);
};

export const createOfficeApi = async (officeData: IOffice) => {
  return await api.post(`/office`, officeData);
}