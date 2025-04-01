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
    { id: 2, label: "Analytics", icon: Users, link: "/analytics" },
    { id: 3, label: "Documents", icon: FileText, link: "/documents" },
    { id: 4, label: "Upload", icon: Upload, link: "/upload" },
    { id: 5, label: "Settings", icon: Settings, link: "/settings" },
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
            <SidebarMenu className="gap-4">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a href={item.link}>
                      <item.icon className="mr-2 h-4 w-4" />
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
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100"
            onClick={() => logOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </SidebarContent>
      </SidebarFooter>
    </Sidebar>
  );
}
