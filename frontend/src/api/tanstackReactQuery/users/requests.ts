import { api } from "@/api/axios/api";

export const fetchCurrentUser = async () => {
  return await api.get(`/user/current`);
};

export const fetchAllUser = async () => {
  return await api.get(`/user`);
};
