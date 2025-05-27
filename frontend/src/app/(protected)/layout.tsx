"use client";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  Separator,
} from "@/components/ui";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";
import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "@/redax/reduxHooks";

import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/api/tanstackReactQuery/users/queries";
import { authenticated } from "@/redax/auth/slice";
import HeaderContent from "@/components/Header/HeaderContent";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const router = useRouter();
  const { isError } = useCurrentUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError) {
      router.replace("/");
    }
    dispatch(authenticated(true));
  }, [isError, router, dispatch]);

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
          <HeaderContent />
        </header>
        <main className="p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
