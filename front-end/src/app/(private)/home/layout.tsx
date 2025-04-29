import "@/app/globals.css";
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
          <SidebarTrigger className="p-8 [&_svg]:size-7" />
          <div className="container mx-auto px-4 py-8">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}
