import { api } from '@/api/axios/api';
import { ILoginCredentials } from '@/types';


export const loginUserApi = async (userData: ILoginCredentials) =>
  await api.post("/auth/login", userData);

export const logoutUserApi = async () => await api.get("/auth/logout") ;

export const refreshTokensApi = async () => await api.get("/auth/refresh-tokens") ;