"use client"

import { Button } from "@/components/ui/Button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/DropdownMenu"
import { UserCV } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { format, parseISO } from "date-fns"
import { MoreHorizontal } from "lucide-react"

export const columns: ColumnDef<UserCV>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
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
      const payment = row.original

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
              onClick={() => {}}
            >
              Recover CV
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {}}
            >
              Delete CV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]