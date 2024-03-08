"use client";

import DataTable from "@/components/main/UserCVTable";
import { Separator } from "@/components/ui/Separator";
import { toast } from "@/hooks/use-toast";
import { CvCreateRequest } from "@/lib/validators/cv";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { columns } from "./Columns";
import { UserCVTableSkeleton } from "@/components/main/UserCVTableSkeleton";
import { useCreateCv, useGetSnapshots } from "@/lib/client/queries";

interface CVSnapshotsProps {
  cvId: string;
}

function CVSnapshots({ cvId } : CVSnapshotsProps) {
  const router = useRouter();
  const { mutate: createNewCv, isPending: isCreatePending, isSuccess: isSuccessCreateCv } = useCreateCv()
  const { data: snapshots, isLoading: isGetSnapshotsLoading } = useGetSnapshots(cvId);

  const onCreate =  (title: string) => {
    createNewCv(title);
  };

  return (
    <>
      <div className="items-center py-3 px-10">
        <h1 className="text-xl font-bold">Snapshots</h1>
      </div>
      <Separator />

      <div className="px-10 mt-8">
        {/* display all user CVs */}
        {isGetSnapshotsLoading ? (
          <UserCVTableSkeleton />
        ) : (
          <DataTable columns={columns} data={snapshots} />
        )}
      </div>
    </>
  );
}

export default CVSnapshots;