import "../globals.css";
import Sidebar from "@/components/custom/sidebar/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8">{children}</div>
      </main>
    </div>
  );
}
