import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  code: string;
  login: string;
  name: string;
  surname: string;
  isBlocked: boolean;
  roles: string[];
  birthday?: string;
}

interface IUserState {
  user: User | null;
}

const initialState: IUserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    deleteUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
