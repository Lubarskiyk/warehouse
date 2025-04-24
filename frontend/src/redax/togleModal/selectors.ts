import { RootState } from "../store";


export const selectIsUserModal = (state: RootState) => state.modal.isUserModal;
export const selectIsProductModal = (state: RootState) => state.modal.isProductModal;
export const selectIsOfficeModal = (state: RootState) => state.modal.isOfficeModal;



