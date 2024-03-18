import { getWebsites } from '@/lib/server/queries'
import React from 'react'
import DataTable from './_components/DataTable'
import { Plus } from 'lucide-react'
import { Columns } from './_components/Columns'
import WebsiteForm from '@/components/forms/WebsiteForm'
import BlurPage from '@/components/global/BlurPage'
import { getAuthSession } from '@/lib/auth'
import { Separator } from '@/components/ui/Separator'

const UserPages = async () => {
  const session = await getAuthSession()

  if (!session) return null

  const pages = await getWebsites(session.user.id)

  console.log(pages)
  if (!pages) return null

  return (
    <>
      <div className="flex justify-between items-center py-3 px-10">
        <h1 className="text-xl font-bold">My Websites</h1>
      </div>

      <Separator />

      <div className="px-10 mt-8">
        <DataTable
          actionButtonText={
            <>
              <Plus size={15} />
              Create Website
            </>
          }
          modalChildren={
            <WebsiteForm ownerId={session.user.id}></WebsiteForm>
          }
          filterValue="name"
          columns={Columns}
          data={pages}
        />
      </div>
    </>
  )
}

export default UserPages