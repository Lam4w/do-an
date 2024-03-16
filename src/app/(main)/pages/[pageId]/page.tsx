import BlurPage from '@/components/global/BlurPage'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { getPage } from '@/lib/server/queries'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import PageSettings from './_components/PageSettings'
import PageSteps from './_components/PageSteps'
import { Separator } from '@/components/ui/Separator'
import { getAuthSession } from '@/lib/auth'

type UserPageProps = {
  params: { pageId: string; ownerId: string }
}

const UserPage = async ({ params }: UserPageProps) => {
  const session = await getAuthSession()
  const pages = await getPage(params.pageId)

  if (!pages || !session) return redirect(`/pages`)

  return (
    <div className="overflow-y-scroll h-[100vh]" id="user-page">
    {/* // <BlurPage> */}
      <div className="flex justify-between items-center py-3 px-10">
        <h1 className="text-xl font-bold">{pages.name}</h1>
        <Link
          href={`/pages`}
          className="flex justify-between gap-4 text-muted-foreground"
        >
          Back
        </Link>
      </div>
      <Separator />

      <div className="px-10 mt-8">
        <Tabs
          defaultValue="steps"
          className="w-full"
        >
          <TabsList>
            <TabsTrigger value="steps">Steps</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="steps">
            <PageSteps
              page={pages}
              ownderId={session.user.id}
              pages={pages.subPages}
              pageId={params.pageId}
            />
          </TabsContent>
          <TabsContent value="settings">
            <PageSettings
              ownerId={session.user.id}
              defaultData={pages}
            />
          </TabsContent>
        </Tabs>
      </div>
    {/* </BlurPage> */}
    </div>
  )
}

export default UserPage