"use client";

import Designer from "@/app/(main)/cv/edit/_components/Designer";
import Editor from "@/app/(main)/cv/edit/_components/Editor";
import { Separator } from "@/components/ui/Separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useSnapshotContent from "@/lib/store";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/Skeleton";

export default function CvPage() {
  const store = useSnapshotContent()
  const searchParams = useSearchParams()

  const cvId = searchParams.get('cv')
  const snapshotId = searchParams.get('snapshot')

  console.log(cvId)

  if (!cvId) {
    return 
  }

  const { data: snapshot, isLoading } = useQuery({
    queryKey: ["getSnapshot"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/cv/snapshot?cv=${cvId}` +
      (!!snapshotId ? `&snapshot=${snapshotId}` : ""));

      store.setContentMain(JSON.parse(data.contentMain))
      store.setContentSide(JSON.parse(data.contentSide))
      store.setDefaultSettings(data.settings)
      store.setTitle(data.title)
      return data;
    },
  });

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
          <TabsContent value="edit" className="m-0">
            {isLoading ? (
              <div className="w-full grid grid-cols-3 space-x-10">
                <div className="flex flex-col space-y-5 col-span-2">
                  <div className="flex justify-between items-center">
                    <Skeleton className="w-[250px] h-[40px]" />
                    <Skeleton className="w-[170px] h-[40px]" />
                  </div>
                  <Skeleton className="w-full h-[90vh] rounded-xl" />                  
                </div>
          
                <div className="flex flex-col col-span-1 space-y-2">
                  <Skeleton className="w-[100px] h-4" />                  
                  <div className="py-2">
                    <Skeleton className="w-full h-[550px]" />
                  </div>
                  <Skeleton className="w-[300px] h-[40px]" />
                </div>
              </div>
            ) : (
              <Editor snapshot={snapshot} />
            )}
          </TabsContent>
          <TabsContent value="design" className="m-0">
            <Designer snapshot={snapshot} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}