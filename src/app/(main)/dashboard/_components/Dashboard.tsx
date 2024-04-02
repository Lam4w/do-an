"use client";

import CreateNewCVModal from "@/components/main/CVModal";
import UserCv from "@/components/main/UserCVCatalog";
import UserCVCatalogSkeleton from "@/components/main/UserCVCatalogSkeleton";
import DataTable from "@/components/main/UserCVTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Separator } from "@/components/ui/Separator";
import { useCreateCv, useGetCvs } from "@/lib/client/queries";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { columns } from "./Columns";

function Dashboard() {
  const router = useRouter();
  const [displayMode, setDisplayMode] = useState<String>("catalog");
  const { data: cvs, isLoading, isSuccess, refetch: refetchCv } = useGetCvs()
  const { mutate: createNewCv, isPending: isCreatePending } = useCreateCv()

  const onCreate =  (title: string) => {
    createNewCv(title);
  };

  return (
    <>
      <div className="flex justify-between items-center py-2 px-10">
        <h1 className="text-xl font-bold">My CVs</h1>

        <div className="flex items-center space-x-3">
          <Select
            defaultValue="catalog"
            onValueChange={(val) => setDisplayMode(val)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Display" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="catalog">Catalog</SelectItem>
              <SelectItem value="table">Table</SelectItem>
            </SelectContent>
          </Select>

          <CreateNewCVModal
            title="Create"
            buttonLabel="Create new"
            label="Create your CV here. Click create when you're done with naming your CV."
            size="sm"
            actionWithoutId={onCreate}
            isPending={isCreatePending}
          />
        </div>
      </div>
      <Separator />

      <div className="px-10 mt-8">
        {/* display all user CVs */}
        {isLoading && (
          <UserCVCatalogSkeleton />
        )}
        {cvs && displayMode === "catalog" ? (
          <UserCv cvs={cvs} isArchived={false} />
        ): cvs && displayMode === "table" && (
          <DataTable columns={columns} data={cvs} />
        )}
      </div>
    </>
  );
}

export default Dashboard;