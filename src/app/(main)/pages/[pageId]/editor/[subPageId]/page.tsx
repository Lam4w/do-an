import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import EditorProvider from '@/providers/pageEditor/PageEditorProvider'
import React from 'react'
import { getAuthSession } from '@/lib/auth'
import PageEditorNavigation from './_components/PageEditorNavigation'
// import FunnelEditorSidebar from './_components/funnel-editor-sidebar'
// import FunnelEditor from './_components/funnel-editor'

type Props = {
  params: {
    pageId: string
    subPageId: string
  }
}

const pageEditerPage = async ({ params }: Props) => {
  const session = await getAuthSession()
  const subPageDetails = await db.subPage.findFirst({
    where: {
      id: params.subPageId,
    },
  })
  if (!subPageDetails || !session) {
    return redirect(
      `pages/${params.pageId}`
    )
  }

  return (
    <div className="fixed inset-0 z-[20] bg-background overflow-hidden">
      <EditorProvider
        ownerId={session.user.id}
        pageId={params.pageId}
        pageDetails={subPageDetails}
      >
        <PageEditorNavigation
          pageId={params.pageId}
          subPageDetails={subPageDetails}
          ownerId={session.user.id}
        />
        {/* <div className="h-full flex justify-center">
          <FunnelEditor funnelPageId={params.funnelPageId} />
        </div>

        <FunnelEditorSidebar subaccountId={params.subaccountId} /> */}
      </EditorProvider>
    </div>
  )
}

export default pageEditerPage