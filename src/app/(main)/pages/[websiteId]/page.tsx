import BlurPage from '@/components/global/BlurPage'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { getWebsite } from '@/lib/server/queries'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import WebsiteSettings from './_components/WebsiteSettings'
import WebsiteSteps from './_components/WebsiteSteps'
import { Separator } from '@/components/ui/Separator'
import { getAuthSession } from '@/lib/auth'
import { buttonVariants } from '@/components/ui/Button'

type UserPageProps = {
  params: { websiteId: string }
}

const UserPage = async ({ params }: UserPageProps) => {
  const session = await getAuthSession()
  const website = await getWebsite(params.websiteId)

  if (!website || !session) return redirect(`/pages`)

  return (
    <div className="overflow-y-scroll h-[100vh]" id="user-page">
      <div className="flex justify-between items-center pt-2 pb-1 px-10">
        <h1 className="text-xl font-bold">{website.name}</h1>
        <Link
          href={`/pages`}
          className={buttonVariants()}
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
            <WebsiteSteps
              website={website}
              ownderId={session.user.id}
              pages={website.pages}
              websiteId={params.websiteId}
            />
          </TabsContent>
          <TabsContent value="settings">
            <WebsiteSettings
              ownerId={session.user.id}
              defaultData={website}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default UserPage