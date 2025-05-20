"use client";
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/slice";
import modalReducer from "./togleModal/slice";
import { setupTokenInterceptor } from '@/api/axios/api';

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer
  },
});
setupTokenInterceptor(store.getState)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
