'use client'

import { Separator } from '@/components/ui/Separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import Editor from '@/components/main/Editor'
import { db } from '@/lib/db'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Snapshot } from '@prisma/client'

const page = ({ params }: { params: { fileId: string } }) => {
  const { data: snapshot, isLoading } = useQuery({
    queryKey: ["snapshot"],
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
            <TabsTrigger value="edit" className="text-zinc-600 dark:text-zinc-200">Edit</TabsTrigger>
            <TabsTrigger value="design" className="text-zinc-600 dark:text-zinc-200">Design</TabsTrigger>
          </TabsList>
        </div>

        <Separator />
        
        <div className="p-10 bg-[#f6f6f6]">
          <TabsContent value="edit" className="m-0">
            {!isLoading && (
              <Editor snapshot={snapshot} />
            )}
          </TabsContent>
          <TabsContent value="design" className="m-0">
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

export default page