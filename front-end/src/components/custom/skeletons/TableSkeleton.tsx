import { Skeleton } from "@/components/ui/skeleton"

export const TableSkeleton = () => {
  return (
    <div className="flex flex-col gap-8 w-full h-[800px] mt-3">
      <Skeleton className="w-full h-28" />
      <Skeleton className="w-full h-[600px]" />
    </div>
  )
}