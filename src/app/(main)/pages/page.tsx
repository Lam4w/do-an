import { getPages } from '@/lib/server/queries'
import React from 'react'
import PagesDataTable from './_components/DataTable'
import { Plus } from 'lucide-react'
import { Columns } from './_components/Columns'
import PageForm from '@/components/forms/PageForm'
import BlurPage from '@/components/global/BlurPage'
import { getAuthSession } from '@/lib/auth'
import { Separator } from '@/components/ui/Separator'

const UserPages = async () => {
  const session = await getAuthSession()

  if (!session) return null

  const pages = await getPages(session.user.id)

  console.log(pages)
  if (!pages) return null

  return (
    <>
      <div className="flex justify-between items-center py-3 px-10">
        <h1 className="text-xl font-bold">My CVs</h1>
      
      </div>

      <Separator />

      <div className="px-10 mt-8">
        <PagesDataTable
          actionButtonText={
            <>
              <Plus size={15} />
              Create Funnel
            </>
          }
          modalChildren={
            <PageForm ownerId={session.user.id}></PageForm>
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