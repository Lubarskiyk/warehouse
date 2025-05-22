"use client";

import { ReactNode } from "react";
import ReduxProvider from "@/providers/ReduxProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { ThemeProvider } from '@/providers/ThemeProvider';


interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ReduxProvider>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </ReduxProvider>
    </ThemeProvider>
  );
}
