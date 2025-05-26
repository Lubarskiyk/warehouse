import { api } from "@/api/axios/api";
import { IOfficeFormInputsData } from "@/components/Office/officeTypes";

export const fetchOfficeAll = async () => {
  return await api.get(`/office`);
};

export const fetchOfficeById = async (id: string) => {
  return await api.get(`/office/${id}`);
};

export const createOfficeApi = async (officeData: IOfficeFormInputsData) => {
  return await api.post(`/office`, officeData);
};
