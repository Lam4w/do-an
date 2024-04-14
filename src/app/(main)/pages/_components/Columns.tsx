'use client'
import { Badge } from '@/components/ui/Badge'
import { buttonVariants } from '@/components/ui/Button'
import { Switch } from '@/components/ui/Switch'
import { toast } from '@/hooks/use-toast'
import { getAuthSession } from '@/lib/auth'
import { updatePublishWebsite, upsertWebsite } from '@/lib/server/queries'
import { WebsitesForUserAccount } from '@/lib/types'
import { cn } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
      const router = useRouter()
      const onSubmit = async (published: boolean) => {
        // const session = await getAuthSession()

        // if (!session?.user.id) return
        const response = await updatePublishWebsite(
          published,
          row.original.id
        )
        if (response)
          toast({
            title: 'Success',
            description: 'Updated website status',
          })
        else
          toast({
            variant: 'destructive',
            title: 'Oppse!',
            description: 'Could not update website status',
          })
        router.refresh()
      }
      const status = row.original.published

      return (
        <div className="flex items-center space-x-2">
          <Switch id="status" defaultChecked={status} onCheckedChange={(e) => onSubmit(e)} />
          {status ? (
            <Badge variant={'default'}>Live</Badge>
          ) : (
            <Badge variant={'secondary'}>Draft</Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return <Link href={'/'} className={cn(buttonVariants({ variant: "outline" }))} >Analytics</Link>
    },
  },
]