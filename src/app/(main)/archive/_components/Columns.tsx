"use client"

import { Button } from "@/components/ui/Button"
import { Checkbox } from "@/components/ui/Checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/DropdownMenu"
import { UserCV } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { format, parseISO } from "date-fns"
import { ArrowDownUp, MoreHorizontal } from "lucide-react"
import DeleteModal from "@/components/main/ComfirmationModal";
import { useArchiveCv, useDeleteCv } from "@/lib/client/queries"

export const columns: ColumnDef<UserCV>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center space-x-2 cursor-pointer"
        >
          Title
          <ArrowDownUp className="ml-2 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = parseISO(row.getValue("createdAt"))

      return <div className="text-left font-medium">{format(new Date(createdAt), "MMM yyyy")}</div>
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      const updatedAt = parseISO(row.getValue("updatedAt"))

      return <div className="text-left font-medium">{format(new Date(updatedAt), "MMM yyyy")}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const cv = row.original
      const { mutate: deleteCv, isPending: isDeletePending, isSuccess: isSuccessDelete } = useDeleteCv()
      const { mutate: archiveCv, isPending: isArchivePending, isSuccess: isSuccessArchive } = useArchiveCv()

      const onArchive = (cvId: string) => {
        archiveCv(cvId)
      };

      const onDelete = (cvId: string) => {
        deleteCv(cvId)
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              asChild
            >
              <DeleteModal 
                title="Are you absolutely sure?" 
                buttonLabel="Restore" 
                desc="TThis will restore your selected CV and move it to dashboard." 
                id={cv.id} 
                action={archiveCv} 
                isPending={isArchivePending} 
              />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              asChild
            >
              <DeleteModal 
                title="Are you absolutely sure?" 
                buttonLabel="Delete" 
                desc="TThis will delete your selected CV" 
                id={cv.id} 
                action={onDelete} 
                isPending={isDeletePending} 
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]