import "../globals.css"
import Sidebar from "@/components/custom/sidebar/Sidebar";
import { SidebarV2 } from "@/components/custom/sidebar/SidebarV2";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <SidebarProvider>
        <SidebarV2 />
        <main className="flex-1 overflow-y-auto">
          <SidebarTrigger className="p-6" />
          <div className="container mx-auto px-4 py-8">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}