import { Skeleton } from "../ui/Skeleton"

export function UserCVTableSkeleton () {
  return (
      <div className="w-full">
        <div className="flex items-center justify-between py-4">
          <Skeleton className="w-[400px] h-[40px]" />
          <Skeleton className="w-[100px] h-[40px]" />
        </div>
          <Skeleton className="w-full h-[400px]" />
      </div>
  )
}