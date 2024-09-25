'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, FileText, Settings, LogOut, Menu } from 'lucide-react';

const menuItems = [
  { id: 1, label: "Dashboard", icon: Home, link: "/" },
  { id: 2, label: "Users", icon: Users, link: "/users" },
  { id: 3, label: "Documents", icon: FileText, link: "/documents" },
  { id: 4, label: "Settings", icon: Settings, link: "/settings" },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`flex flex-col h-screen bg-white shadow-lg z-10 border-r border-slate-200 sticky transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="flex items-center justify-between h-20 border-b px-4">
        {
         isOpen?
         <h1 className={`text-3xl font-bold transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>{isOpen ? `Fin` : ""}</h1>
         :
         ""
        }
        <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-100 transition-transform ease-in duration-200">
          <Menu size={24} />
        </button>
      </div>
      <ul className="flex flex-col py-4">
        {menuItems.map((item) => (
          <li key={item.id}>
            <Link href={item.link}
              className={`flex items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-black'}`}
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                <item.icon size={20} />
              </span>
              {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-auto p-4 border-t border-slate-200">
        <button className="flex items-center text-red-500 hover:text-red-600">
          <LogOut size={20} className="mr-2" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;