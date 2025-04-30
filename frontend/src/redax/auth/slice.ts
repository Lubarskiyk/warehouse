import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  isLoading: boolean;
  error: null;
  isAuthenticated: boolean;
}

const initialState: IAuthState = {
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    authenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { clearError, authenticated } = authSlice.actions;

export default authSlice.reducer;
