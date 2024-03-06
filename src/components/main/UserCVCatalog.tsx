"use client";

import { toast } from "@/hooks/use-toast";
import { CvDeleteRequest, CvEditRequest } from "@/lib/validators/cv";
import { UserCV } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { format } from "date-fns";
import { Archive, ArchiveRestore, Ghost, MoreVertical, Pencil, Split, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CVModal from "./CVModal";
import DeleteModal from "./ComfirmationModal";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/Tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/DropdownMenu";
import { Button, buttonVariants } from "../ui/Button";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/Separator";

interface UserCvProps {
  cvs: UserCV[];
  isArchived: boolean;
}

export default function UserCvFeed ({ cvs, isArchived }: UserCvProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: editCv, isPending: isEditPending } = useMutation({
    mutationFn: async ({ title, id }: { title: string; id: string }) => {
      const payload: CvEditRequest = {
        title,
        cvId: id,
      };
      const { data } = await axios.patch("/api/user/cv", payload);

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
    onSuccess: () => {
      router.refresh();

      queryClient.refetchQueries({
        queryKey: ["userCvs"],
        type: "all",
      });
    },
  });

  const { mutate: archiveCv, isPending: isArchivePending } = useMutation({
    mutationFn: async (id: string) => {
      const payload: CvDeleteRequest = {
        cvId: id,
      };
      const { data } = await axios.patch("/api/user/cv/archive", payload);

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
        description: "Could not archive CV, please try again later.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      router.refresh();

      queryClient.invalidateQueries({
        queryKey: ["userCvs"],
        refetchType: "all",
      });
    },
  });

  const { mutate: deleteCv, isPending: isDeletePending } = useMutation({
    mutationFn: async (id: string) => {
      const payload: CvDeleteRequest = {
        cvId: id,
      };
      const { data } = await axios.patch("/api/user/cv/delete", payload);

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
        description: "Could not delete CV, please try again later.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      router.refresh();

      queryClient.invalidateQueries({
        queryKey: ["userCvs"],
        refetchType: "all",
      });
    },
  });

  const onEdit = (title: string, id: string) => {
    editCv({ title, id });
  };

  return (
    <div className="">
      {cvs && cvs?.length !== 0 ? (
        <ul className="grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
          {cvs
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .map((cv, i) => (
              <li
                key={i}
                className="flex flex-col justify-between col-span-1 border border-gray-200 divide-y divide-gray-200 bg-white rounded-lg shadow-md transition hover:shadow-lg"
              >
                <div
                  className="flex flex-col gap-2"
                >
                  <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-emerald-400 to-green-600" />
                    <div className="flex-1 truncate">
                      <div className="flex items-center justify-between space-x-3">
                        <h3 className="truncate text-lg font-medium text-zinc-900 cursor-pointer" onClick={() => router.push(`/cv/edit?cv=${cv.id}`)}>
                          {cv.title}
                        </h3>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                            {isArchived ? (
                                <DeleteModal title="Are you absolutely sure?" buttonLabel="Delete" desc="TThis will restore your selected CV and move it to archive." id={cv.id} action={archiveCv} isPending={isArchivePending} />
                              ) : (
                                <CVModal
                                  id={cv.id}
                                  title="Edit"
                                  initialValue={cv.title}
                                  buttonLabel="Save change"
                                  label="Edit your CV here. Click save when you're done with naming your CV."
                                  variant="outline"
                                  clasName="w-full"
                                  actionWithId={onEdit}
                                  isPending={isEditPending}
                                />
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                            {isArchived ? (
                              <DeleteModal title="Are you absolutely sure?" buttonLabel="Delete permanently" desc="TThis will delete your selected CV permanently" id={cv.id} action={deleteCv} isPending={isDeletePending} />
                            ) : (
                              <DeleteModal title="Are you absolutely sure?" buttonLabel="Delete" desc="TThis will delete your selected CV" id={cv.id} action={archiveCv} isPending={isArchivePending} />
                            )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-2 mt-4 flex items-center justify-between gap-3 text-xs text-zinc-500">
                  <div className="flex flex-col items-left space-y-2 w-full justify-start">
                    <div className="">
                      <span>Created on: </span>
                      {format(new Date(cv.createdAt), "dd MMM yyyy")}
                    </div>
                    <div className="">
                      <span>Updated on: </span>
                      {format(new Date(cv.updatedAt), "dd MMM yyyy")}
                    </div>
                  </div>

                  <div 
                    className={cn(buttonVariants({variant: "outline"}), "flex items-center space-x-2 cursor-pointer")}
                    onClick={() => {
                      if (!isArchived) {
                        router.push(`/cv/snapshots/${cv.id}`)
                      }
                    }}
                  >
                    <Split className="w-5 h-5" />
                    <Separator orientation="vertical" />
                    <span>Snapshots</span>
                  </div>

                  {/* {isArchived ? (
                    <DeleteModal title="Are you absolutely sure?" desc="TThis will restore your selected CV and move it to archive." id={cv.id} action={archiveCv} ButtonIcon={ArchiveRestore}/>
                  ) : (
                    <CVModal
                      id={cv.id}
                      title="Edit"
                      initialValue={cv.title}
                      buttonLabel="Save change"
                      ButtonIcon={Pencil}
                      label="Edit your CV here. Click save when you're done with naming your CV."
                      variant="ghost"
                      clasName="w-full"
                      actionWithId={onEdit}
                    />
                  )}

                  {isArchived ? (
                    <DeleteModal title="Are you absolutely sure?" desc="TThis will delete your selected CV permanently" id={cv.id} action={deleteCv} ButtonIcon={Trash}/>
                  ) : (
                    <DeleteModal title="Are you absolutely sure?" desc="TThis will delete your selected CV" id={cv.id} action={archiveCv} ButtonIcon={Archive}/>
                  )} */}
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center gap-2">
          <Ghost className="h-8 w-8 text-zinc-800" />
          <h3 className="font-semibold text-xl">Pretty empty around here</h3>
          <p>Let&apos;s create your first CV.</p>
        </div>
      )}
    </div>
  );
};