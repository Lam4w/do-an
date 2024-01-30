"use client";

import {
  Ghost,
  Loader2,
  MessageSquare,
  Plus,
  Trash,
  PlusCircle,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "../ui/Button";
import { useState } from "react";
import { Separator } from "../ui/Separator";
import DeleteModal from "./DeleteModal";
import CreateNewCVModal from "./CVModal";

const files = [
  {
    id: "jiojwrioqhwr",
    createdAt: "2024-01-28T16:38:15.155+00:00",
    name: "Test CV",
  },
  {
    id: "jiojwrioqhwr",
    createdAt: "2024-02-28T16:38:15.155+00:00",
    name: "Test CV2",
  },
  {
    id: "jiojwrioqhwr",
    createdAt: "2024-03-28T16:38:15.155+00:00",
    name: "Test CV3",
  },
];

const Dashboard = () => {
  return (
    <div className="">
      <div className="flex justify-between items-center py-2 px-10">
        <h1 className="text-xl font-bold">My CVs</h1>

        <CreateNewCVModal
          title="Create"
          buttonLabel="Create new"
          label="Create your CV here. Click create when you're done with naming your CV."
          size="sm"
        />
      </div>
      <Separator />

      {/* display all user CVs */}
      <div className="px-10">
        {files && files?.length !== 0 ? (
          <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
            {files
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              )
              .map((file) => (
                <li
                  key={file.id}
                  className="h-36 flex flex-col justify-between col-span-1 border border-gray-200 divide-y divide-gray-200 bg-white rounded-lg shadow-md transition hover:shadow-lg"
                >
                  <Link
                    href={`/dashboard/${file.id}`}
                    className="flex flex-col gap-2"
                  >
                    <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-emerald-400 to-green-600" />
                      <div className="flex-1 truncate">
                        <div className="flex items-center space-x-3">
                          <h3 className="truncate text-lg font-medium text-zinc-900">
                            {file.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="px-3 mt-4 grid grid-cols-4 place-items-center py-2 gap-3 text-xs text-zinc-500">
                    <div className="flex items-center gap-2 col-span-2">
                      <span>Created on:</span>
                      {/* <Plus className="h-4 w-4" /> */}
                      {format(new Date(file.createdAt), "MMM yyyy")}
                      {/* {file.createdAt} */}
                    </div>

                    {/* <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => deleteFile({ id: file.id })}
                    >
                      {currentlyDeletingFile === file.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Pencil className="h-4 w-4" />
                      )}
                    </Button> */}
                    <CreateNewCVModal
                      title="Edit"
                      buttonLabel="Save change"
                      label="Edit your CV here. Click save when you're done with naming your CV."
                      ButtonIcon={Pencil}
                      variant="ghost"
                      clasName="w-full"
                    />

                    <DeleteModal />
                    {/* <Button
                      variant="destructive"
                      size="sm"
                      className="w-full"
                      onClick={() => deleteFile({ id: file.id })}
                    >
                      {currentlyDeletingFile === file.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash className="h-4 w-4" />
                      )}
                    </Button> */}
                  </div>
                </li>
              ))}
            <li className="h-36 col-span-1 flex items-center justify-center border border-gray-200 divide-y divide-gray-200 bg-white rounded-lg shadow-md transition hover:shadow-lg cursor-pointer">
              <PlusCircle className="w-14 h-14 text-gray-300 hover:text-gray-400 transition" />
            </li>
          </ul>
        ) : (
          <div className="mt-16 flex flex-col items-center justify-center gap-2">
            <Ghost className="h-8 w-8 text-zinc-800" />
            <h3 className="font-semibold text-xl">Pretty empty around here</h3>
            <p>Let&apos;s upload your first CV.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
