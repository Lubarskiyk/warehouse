import { RootState } from '@/redax/store';

export const selectUser = (state: RootState) => state.user.user;