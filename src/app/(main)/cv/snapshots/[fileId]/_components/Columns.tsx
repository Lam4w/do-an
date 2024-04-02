"use client"

import { Button } from "@/components/ui/Button"
import { Checkbox } from "@/components/ui/Checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/DropdownMenu"
import { useDeleteCv, useDeleteSnapshot } from "@/lib/client/queries"
import { Snapshot } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { format, parseISO } from "date-fns"
import { ArrowDownUp, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import DeleteModal from "@/components/main/ComfirmationModal";

export const columns: ColumnDef<Snapshot>[] = [
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
    cell: ({ row }) => {
      const snapshot = row.original

      return (
        <Link className="" href={`/cv/edit?cv=${snapshot.cvId}&snapshot=${snapshot.id}`}>{snapshot.title}</Link>
      )
    }
  },
  {
    accessorKey: "template",
    accessorFn: (row) => row.settings.template,
    header: "Template",
    cell: ({ row }) => <div className="uppercase">{row.getValue('template')}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = parseISO(row.getValue("createdAt"))

      return <div className="text-left font-medium">{format(new Date(createdAt), "dd MMM yyyy")}</div>
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      const updatedAt = parseISO(row.getValue("updatedAt"))

      return <div className="text-left font-medium">{format(new Date(updatedAt), "dd MMM yyyy")}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { mutate: deleteSnapshot, isPending: isDeletePending, isSuccess: isSuccessDelete } = useDeleteSnapshot()
      const snapshot = row.original

      const onDelete = (snapshotId: string) => {
        deleteSnapshot(snapshotId)
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
            <DropdownMenuSeparator />
            <DropdownMenuItem
              // onClick={() => deleteSnapshot(snapshot.id)}
              asChild
            >
              {/* Delete CV */}
              <DeleteModal 
                title="Are you absolutely sure?" 
                buttonLabel="Delete" 
                desc="TThis will delete your selected snapshot permanently" 
                id={snapshot.id} 
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