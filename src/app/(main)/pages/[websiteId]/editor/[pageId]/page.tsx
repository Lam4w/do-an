import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import EditorProvider from '@/providers/pageEditor/PageEditorProvider'
import React from 'react'
import { getAuthSession } from '@/lib/auth'
import PageEditorNavigation from './_components/WebsiteEditorNavigation'
import WebsiteEditorSidebar from './_components/sidebar/WebsiteEditorSidebar'
import PageEditor from './_components/pageEditor/PageEditor'
// import FunnelEditor from './_components/funnel-editor'

type Props = {
  params: {
    websiteId: string
    pageId: string
  }
}

const pageEditerPage = async ({ params }: Props) => {
  const session = await getAuthSession()
  const subPageDetails = await db.page.findFirst({
    where: {
      id: params.pageId,
    },
  })
  if (!subPageDetails || !session) {
    return redirect(
      `pages/${params.websiteId}`
    )
  }

  return (
    <div className="fixed inset-0 z-[20] bg-background overflow-hidden">
      <EditorProvider
        ownerId={session.user.id}
        websiteId={params.websiteId}
        pageDetails={subPageDetails}
      >
        <PageEditorNavigation
          websiteId={params.websiteId}
          pageDetails={subPageDetails}
          ownerId={session.user.id}
        />
        <div className="h-full flex justify-center">
          <PageEditor pageId={params.pageId} />
        </div>
        <WebsiteEditorSidebar ownerId={session.user.id} />
      </EditorProvider>
    </div>
  )
}

export default pageEditerPage