"use client";

import Designer from "@/app/(main)/cv/edit/[fileId]/_components/Designer";
import Editor from "@/app/(main)/cv/edit/[fileId]/_components/Editor";
import { Separator } from "@/components/ui/Separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function CvPage({ params }: { params: { fileId: string } }) {
  const { data: snapshot, isLoading } = useQuery({
    queryKey: ["getSnapshot"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/cv/snapshot?cv=${params.fileId}`);

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
            >
              Design
            </TabsTrigger>
          </TabsList>
        </div>

        <Separator />

        <div className="px-10 py-5 bg-[#f6f6f6] h-[95vh] overflow-y-scroll">
          <TabsContent value="edit" className="m-0">
            {!isLoading && <Editor snapshot={snapshot} />}
          </TabsContent>
          <TabsContent value="design" className="m-0">
            <Designer snapshot={snapshot} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

