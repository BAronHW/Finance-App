import { Skeleton } from "@/components/ui/skeleton"

export const SettingsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Skeleton className="h-40 w-40 rounded-full" />
      <Skeleton className="w-[684px] h-[72px]" />
      <Skeleton className="w-[684px] h-[72px]" />
      <Skeleton className="w-[684px] h-[72px]" />
      <Skeleton className="w-[684px] h-[72px]" />
      <Skeleton className="w-[684px] h-[72px]" />
    </div>
  )
}