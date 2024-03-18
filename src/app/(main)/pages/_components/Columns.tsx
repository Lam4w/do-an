'use client'
import { Badge } from '@/components/ui/Badge'
import { WebsitesForUserAccount } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

export const Columns: ColumnDef<WebsitesForUserAccount>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return (
        <Link
          className="flex gap-2 items-center"
          href={`/pages/${row.original.id}`}
        >
          {row.getValue('name')}
          <ExternalLink size={15} />
        </Link>
      )
    },
  },
  {
    accessorKey: 'updatedAt',
    header: 'Last Updated',
    cell: ({ row }) => {
      const date = ` ${row.original.updatedAt.toDateString()} ${row.original.updatedAt.toLocaleTimeString()} `
      return <span className="text-muted-foreground">{date}</span>
    },
  },
  {
    accessorKey: 'published',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.published
      return status ? (
        <Badge variant={'default'}>Live - {row.original.subDomainName}</Badge>
      ) : (
        <Badge variant={'secondary'}>Draft</Badge>
      )
    },
  },
]