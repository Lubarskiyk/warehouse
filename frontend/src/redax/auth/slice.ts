import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  isAuthenticated: boolean;
}
const initialState: IAuthState = {
  isAuthenticated: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logIn: (state) => {
      state.isAuthenticated = true;
      console.log(state.isAuthenticated);
    },
    logOut: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
