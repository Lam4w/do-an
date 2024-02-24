"use client";

import React, { useState } from "react";
import CreateNewCVModal from "@/components/main/CVModal";
import { Separator } from "@/components/ui/Separator";
import UserCv from "@/components/main/UserCvFeed";
import { UserCV } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CvCreateRequest } from "@/lib/validators/cv";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const Archive = () => {
  const router = useRouter();

  const { data: cvs, isLoading } = useQuery({
    queryKey: ["userTrash"],
    queryFn: async () => {
      const { data } = await axios.get("/api/user/cv/archive");

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
      <div className="flex justify-between items-center py-2 px-10">
        <h1 className="text-xl font-bold">Trash</h1>

        <CreateNewCVModal
          title="Create"
          buttonLabel="Create new"
          label="Create your CV here. Click create when you're done with naming your CV."
          size="sm"
          actionWithoutId={onCreate}
        />
      </div>
      <Separator />

      {/* display all user CVs */}
      {!isLoading && <UserCv cvs={cvs} isArchived={true} />}
    </>
  );
};

export default Archive;