"use client";

import CreateNewCVModal from "@/components/main/CVModal";
import UserCv from "@/components/main/UserCVCatalog";
import DataTable from "@/components/main/UserCVTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Separator } from "@/components/ui/Separator";
import { toast } from "@/hooks/use-toast";
import { CvCreateRequest } from "@/lib/validators/cv";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { columns } from "./Columns";

function CVSnapshots() {
  const router = useRouter();

  const { data: cvs, isLoading } = useQuery({
    queryKey: ["userCvs"],
    queryFn: async () => {
      const { data } = await axios.get("/api/user/cv");

      return data;
    },
    refetchOnMount: true,
  });

  const { mutate: createNewCv, isPending: isCreatePending } = useMutation({
    mutationFn: async (title: string) => {
      const payload: CvCreateRequest = {
        title: title,
      };
      const { data } = await axios.post("/api/user/cv", payload);

      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "CV already exists",
            description: "Please choose a different CV name.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 422) {
          return toast({
            title: "Invalid CV name",
            description: "Please choose a different CV name.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 401) {
          return router.push("/sign-in");
        }
      }

      toast({
        title: "There was an error",
        description: "Could not create new CV, please try again later.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      router.push(`/cv/edit/${data}`);
    },
  });

  const onCreate = (title: string) => {
    createNewCv(title);
  };

  return (
    <>
      <div className="items-center py-2 px-10">
        <h1 className="text-xl font-bold">Snapshots</h1>
      </div>
      <Separator />

      <div className="px-10 mt-8">
        {/* display all user CVs */}
        <DataTable columns={columns} data={cvs} />
      </div>
    </>
  );
}

export default CVSnapshots;