import Meteors from "@/src/components/magicui/meteors";

export function MeteorDemo() {
  return (
    <div className="flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
      <Meteors number={35} />
    </div>
  );
}