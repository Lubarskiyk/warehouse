import { api } from '@/api/axios/api';
import { ILoginCredentials } from '@/types';


export const loginUserApi = async (userData: ILoginCredentials) =>
  await api.post("/auth/login", userData);

