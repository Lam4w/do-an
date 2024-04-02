"use client";

import { useArchiveCv, useDeleteCv, useEditCv } from "@/lib/client/queries";
import { cn } from "@/lib/utils";
import { UserCV } from "@prisma/client";
import { format } from "date-fns";
import { Ghost, MoreVertical, Split } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "../ui/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/DropdownMenu";
import { Separator } from "../ui/Separator";
import CVModal from "./CVModal";
import DeleteModal from "./ComfirmationModal";

interface UserCvProps {
  cvs: UserCV[];
  isArchived: boolean;
}

export default function UserCvFeed ({ cvs, isArchived }: UserCvProps) {
  const router = useRouter();
  const { mutate: editCv, isPending: isEditPending, isSuccess: isSuccessEdit } = useEditCv()
  const { mutate: archiveCv, isPending: isArchivePending, isSuccess: isSuccessArchive } = useArchiveCv()
  const { mutate: deleteCv, isPending: isDeletePending, isSuccess: isSuccessDelete } = useDeleteCv()

  const onEdit = (title: string, id: string) => {
    editCv({ title, id });

    // if (isSuccessEdit) {
    //   return toast({
    //     title: "Successfully",
    //     description: "Successfully edited your CV",
    //     variant: "default",
    //   });
    // }
  };

  const onArchive = (cvId: string) => {
    archiveCv(cvId)

    // if (isSuccessArchive) {
    //   return toast({
    //     title: "Successfully",
    //     description: "Successfully edited your CV",
    //     variant: "default",
    //   });
    // }
  };

  const onDelete = (cvId: string) => {
    deleteCv(cvId)

    // if (isSuccessDelete) {
    //   return toast({
    //     title: "Successfully",
    //     description: "Successfully deleted your CV",
    //     variant: "default",
    //   });
    // }
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
                            <DropdownMenuItem asChild>
                            {isArchived ? (
                                <DeleteModal title="Are you absolutely sure?" buttonLabel="Restore" desc="TThis will restore your selected CV and move it to dashboard." id={cv.id} action={archiveCv} isPending={isArchivePending} />
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
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                            {isArchived ? (
                              <DeleteModal title="Are you absolutely sure?" buttonLabel="Delete permanently" desc="TThis will delete your selected CV permanently" id={cv.id} action={onDelete} isPending={isDeletePending} />
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