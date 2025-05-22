"use client";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  Separator,
} from "@/components/ui";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";
import { ReactNode, useEffect } from "react";
import { useAppSelector } from "@/redax/reduxHooks";
import { selectIsAuthenticated } from "@/redax/auth/selectors";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <p>Привет сюда надо добавить </p>
        </header>
        <main className="p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
