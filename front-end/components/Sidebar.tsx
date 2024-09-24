'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, FileText, Settings, LogOut } from 'lucide-react';

const menuItems = [
  { id: 1, label: "Dashboard", icon: Home, link: "/" },
  { id: 2, label: "Users", icon: Users, link: "/users" },
  { id: 3, label: "Documents", icon: FileText, link: "/documents" },
  { id: 4, label: "Settings", icon: Settings, link: "/settings" },
];

function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen w-64 bg-gray-800 text-white z-10">
      <div className="flex items-center justify-center h-20 shadow-md">
        <h1 className="text-3xl font-bold">Logo</h1>
      </div>
      <ul className="flex flex-col py-4">
        {menuItems.map((item) => (
          <li key={item.id}>
            <Link href={item.link} 
              className={`flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${
                pathname === item.link ? 'bg-gray-700' : ''
              }`}
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <item.icon size={20} />
              </span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-auto p-4">
        <button className="flex items-center text-red-400 hover:text-red-600">
          <LogOut size={20} className="mr-2" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;