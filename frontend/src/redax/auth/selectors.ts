import { RootState } from '@/redax/store';

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;