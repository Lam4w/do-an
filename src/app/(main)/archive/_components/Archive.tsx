"use client";

import React, { useState } from "react";
import CreateNewCVModal from "@/components/main/CVModal";
import { Separator } from "@/components/ui/Separator";
import UserCv from "@/components/main/UserCVCatalog";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CvCreateRequest } from "@/lib/validators/cv";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import DataTable from "@/components/main/UserCVTable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { columns } from "./Columns";
import UserCVCatalogSkeleton from "@/components/main/UserCVCatalogSkeleton";
import { useCreateCv, useGetArchives } from "@/lib/client/queries";

const Archive = () => {
  const router = useRouter();
  const [displayMode, setDisplayMode] = useState<String>("catalog")

  const { data: cvs, isLoading, isSuccess, refetch: refetchCv } = useGetArchives()
  const { mutate: createNewCv, isPending: isCreatePending } = useCreateCv()

  const onCreate =  (title: string) => {
    createNewCv(title);
  };

  return (
    <>
      <div className="flex justify-between items-center py-2 px-10">
        <h1 className="text-xl font-bold">Trash</h1>

        <div className="flex items-center space-x-3">
          <Select defaultValue="catalog" onValueChange={(val) => setDisplayMode(val)}>
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

      <div className="px-10 mt-8 mb-10">
        {/* display all user CVs */}
        {isLoading && (
          <UserCVCatalogSkeleton />
        )}
        {cvs && displayMode === "catalog" ? (
          <UserCv cvs={cvs} isArchived={true} />
        ): cvs && displayMode === "table" && (
          <DataTable columns={columns} data={cvs} />
        )}
      </div>
    </>
  );
};

export default Archive;