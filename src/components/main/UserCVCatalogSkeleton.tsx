import { Skeleton } from "../ui/Skeleton"

export default function UserCVCatalogSkeleton () {
  return (
    <div className="">
      <ul className="grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
        {Array(3).fill(null).map((u, i) => (
          <li
            key={i}
            className="flex flex-col justify-between col-span-1 border border-gray-200 divide-y divide-gray-200 bg-white rounded-lg shadow-md transition hover:shadow-lg"
          >
            <div className="flex flex-col gap-2">
              <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                <Skeleton className="w-[42px] h-[42px] rounded-full" />
                <div className="flex-1">
                  <Skeleton className="w-[150px] h-[32px]" />
                </div>
              </div>
            </div>

            <div className="px-6 py-2 mt-4 flex items-center justify-between gap-3 text-xs text-zinc-500">
              <div className="flex flex-col items-left space-y-2 w-full justify-start">
                <Skeleton className="h-4 w-[160px]" />
                <Skeleton className="h-4 w-[160px]" />
              </div>
              <Skeleton className="h-[40px] w-[200px]" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}