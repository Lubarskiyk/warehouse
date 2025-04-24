import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IModalState {
  isUserModal: boolean;
  isOfficeModal: boolean;
  isProductModal: boolean;
}

const initialState: IModalState = {
  isUserModal: false,
  isOfficeModal: false,
  isProductModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<keyof IModalState>) => {
      state[action.payload] = true;
    },
    closeModal: (state, action: PayloadAction<keyof IModalState>) => {
      state[action.payload] = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
