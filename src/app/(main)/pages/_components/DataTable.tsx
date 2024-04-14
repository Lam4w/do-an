'use client'
import React from 'react'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table'
import { useModal } from '../../../../providers/ModalProvider'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import CustomModal from '@/components/global/CustomModal'

interface FunnelsDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filterValue: string
  actionButtonText?: React.ReactNode
  modalChildren?: React.ReactNode
}

export default function FunnelsDataTable<TData, TValue>({
  columns,
  data,
  filterValue,
  modalChildren,
  actionButtonText,
}: FunnelsDataTableProps<TData, TValue>) {
  const { isOpen, setOpen, setClose } = useModal()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center py-4 gap-2">
          <Input
            placeholder="Search website name..."
            value={
              (table.getColumn(filterValue)?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn(filterValue)?.setFilterValue(event.target.value)
            }
            className="h-12"
          />
        </div>
        <Button
          className="flex- gap-2"
          onClick={() => {
            if (modalChildren)
              setOpen(
                <CustomModal
                  title="Create your personal page"
                  subheading="Fill out the form below to start!"
                >
                  {modalChildren}
                </CustomModal>
              )
          }}
        >
          {actionButtonText}
        </Button>
      </div>
      <div className=" border bg-background rounded-lg">
        <Table className="">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No Results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}