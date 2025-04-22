"use client";

import { ReactNode } from "react";
import store from "@/redax/store";
import { Provider } from "react-redux";

interface ReduxProviderProps {
  children: ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children} </Provider>;
}
