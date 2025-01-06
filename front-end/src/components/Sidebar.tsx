'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, FileText, Settings, LogOut, Menu } from 'lucide-react';
import { Button } from "@//components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@//components/ui/sheet";

const menuItems = [
  { id: 1, label: "Dashboard", icon: Home, link: "/" },
  { id: 2, label: "Users", icon: Users, link: "/users" },
  { id: 3, label: "Documents", icon: FileText, link: "/documents" },
  { id: 4, label: "Settings", icon: Settings, link: "/settings" },
];

function Sidebar() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-20 border-b">
            <h1 className="text-3xl font-bold">Fin</h1>
          </div>
          <nav className="flex-grow">
            {menuItems.map((item) => (
              <Link key={item.id} href={item.link} passHref>
                <Button
                  variant={pathname === item.link ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t">
            <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default Sidebar;