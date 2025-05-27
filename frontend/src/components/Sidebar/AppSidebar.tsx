import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { sidebarMenuData } from "@/components/Sidebar/sidebarItem";
import { ComponentProps } from 'react';
import { useRouter } from 'next/navigation';


export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  return (
    <Sidebar {...props}>
      <SidebarHeader>
          <SidebarMenuButton
            asChild
            className="data-[slot=sidebar-menu-button]:!p-1.5"
          >
            <a href="/frontend/public" className="flex flex-col h-full items-start">
              <span className="text-base font-semibold ">WinkHaus</span>
              <span className="text-base font-semibold ">Warehouse</span>
            </a>
          </SidebarMenuButton>

      </SidebarHeader>
      <SidebarContent>
        {sidebarMenuData.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton className='cursor-pointer' asChild isActive={item.isActive} onClick={() => router.push(item.url)}>
                      <p className="">{item.title}</p>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
