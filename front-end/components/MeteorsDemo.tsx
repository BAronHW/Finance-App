import Meteors from "@/components/magicui/meteors";

export function MeteorDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
      <Meteors number={35} />
    </div>
  );
}
