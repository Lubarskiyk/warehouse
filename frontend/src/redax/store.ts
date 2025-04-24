"use client";
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/slice";
import modalReducer from "./togleModal/slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
