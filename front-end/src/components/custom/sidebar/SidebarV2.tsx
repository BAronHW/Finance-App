"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, Users, FileText, Settings, Upload, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/contexts/authContext";
import { Button } from "@/components/ui/button";

export function SidebarV2() {
  const pathname = usePathname();
  const auth = useAuth();

  const currentUserId = auth.userId;
  const dashboardLink = currentUserId ? `/home/${currentUserId}` : "/sign-in";
  console.log(currentUserId);

  const logOut = () => {
    auth.logOut();
  };

  const menuItems = [
    {
      id: 1,
      label: "Dashboard",
      icon: Home,
      link: dashboardLink || "",
    },
    { id: 2, label: "Analytics", icon: Users, link: `${dashboardLink}/analytics` },
    { id: 3, label: "Documents", icon: FileText, link: `${dashboardLink}/documents` },
    { id: 4, label: "Upload", icon: Upload, link: `${dashboardLink}/upload` },
    { id: 5, label: "Settings", icon: Settings, link: `${dashboardLink}/settings` },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarContent>
          <div className="flex items-center justify-center h-20 border-b">
            <h1 className="text-3xl font-bold">Fin</h1>
          </div>
        </SidebarContent>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild className="h-16 [&_svg]:size-6">
                    <a href={item.link}>
                      <item.icon className="mx-6 h-4 w-4" />
                      <span className="text-lg font-medium">{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarContent>
          <Button
            variant="ghost"
            className="w-full h-16 justify-start text-red-500 hover:text-red-600 hover:bg-red-100 text-lg"
            onClick={() => logOut()}
          >
            <LogOut className="mx-6 h-4 w-4" />
            Logout
          </Button>
        </SidebarContent>
      </SidebarFooter>
    </Sidebar>
  );
}
