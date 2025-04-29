import { Card, CardContent } from "@/components/ui/card";
import "../../globals.css";
import WordPullUp from "@/components/magicui/word-pull-up";
import { MeteorDemo } from "@/components/custom/background/MeteorsDemo";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="relative min-h-screen w-full overflow-x-hidden">
        <div className="absolute">
          <MeteorDemo />
        </div>
        <div className="relative inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8 flex-col gap-6">
          <WordPullUp
            className="text-4xl font-bold tracking-[-0.02em] text-black md:text-7xl md:leading-[5rem] z-10"
            words="FinApp"
          />
          <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-xl z-5">
            <CardContent className="p-6 sm:p-8">
              {children}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
