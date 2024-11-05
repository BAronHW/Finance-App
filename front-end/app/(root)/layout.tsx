import "../globals.css";
import Sidebar from "@/components/Sidebar";
import { AuthProvider } from "../context/authContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </main>
      </div>
    </AuthProvider>
  );  
}