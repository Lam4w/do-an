"use client";

import { Separator } from "@/components/ui/Separator";
import { Skeleton } from "@/components/ui/Skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useGetSnapshot } from "@/lib/client/queries";
import { useSearchParams } from "next/navigation";
import SnapshotEditWrapper from "./_components/SnapshotEditWrapper";

export default function CvPage() {
  const searchParams = useSearchParams()
  const cvId = searchParams.get('cv')
  const snapshotId = searchParams.get('snapshot')

  if (!cvId) {
    // todo: error page/ unauthorized page
    return 
  }
  
  const { data: snapshot, isLoading, isSuccess } = useGetSnapshot()

  return (
    <div className="">
      <Tabs defaultValue="edit">
        <div className="flex items-center justify-center px-10 py-[0.38rem]">
          <TabsList className="">
            <TabsTrigger
              value="edit"
              className="text-zinc-600 dark:text-zinc-200"
            >
              Edit
            </TabsTrigger>
            <TabsTrigger
              value="design"
              className="text-zinc-600 dark:text-zinc-200"
              disabled={isLoading ? true : false}
            >
              Design
            </TabsTrigger>
          </TabsList>
        </div>

        <Separator />
        <div className="px-10 py-5 bg-[#f6f6f6] h-[95vh] overflow-y-scroll">
          {isLoading ? (
            <div className="w-full grid grid-cols-3 space-x-10">
              <div className="flex flex-col space-y-5 col-span-2">
                <div className="flex justify-between items-center">
                  <Skeleton className="w-[250px] h-[40px]" />
                  <Skeleton className="w-[170px] h-[40px]" />
                </div>
                <Skeleton className="w-full h-[80vh] rounded-xl" />                  
              </div>
        
              <div className="flex flex-col col-span-1 space-y-2">
                <Skeleton className="w-[100px] h-4" />                  
                <div className="py-2">
                  <Skeleton className="w-full h-[500px]" />
                </div>
                <Skeleton className="w-[300px] h-[40px]" />
              </div>
            </div>
          ) : snapshot && (
            <SnapshotEditWrapper snapshot={snapshot} />
          )}
        </div>
      </Tabs>
    </div>
  )
}