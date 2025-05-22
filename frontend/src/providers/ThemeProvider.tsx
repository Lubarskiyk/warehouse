"use client";

import dynamic from 'next/dynamic';
import * as React from "react";
import { ThemeProviderProps } from "next-themes";

const NextThemesProvider = dynamic(
  () => import('next-themes').then((mod) => mod.ThemeProvider),
  {
    ssr: false,
    loading: () => null
  }
);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
