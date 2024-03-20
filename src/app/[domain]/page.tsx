import { db } from '@/lib/db'
import { getDomainContent } from '@/lib/server/queries'
import EditorProvider from '@/providers/pageEditor/PageEditorProvider'
import { notFound } from 'next/navigation'
import React from 'react'
import PageEditor from '../(main)/pages/[websiteId]/editor/[pageId]/_components/pageEditor/PageEditor'

const Page = async ({ params }: { params: { domain: string } }) => {
  const domainData = await getDomainContent(params.domain.slice(0, -1))
  if (!domainData) return notFound()

  const pageData = domainData.pages.find((page) => !page.pathName)

  if (!pageData) return notFound()

  await db.page.update({
    where: {
      id: pageData.id,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
  })

  return (
    <EditorProvider
      ownerId={domainData.ownerId}
      pageDetails={pageData}
      websiteId={domainData.id}
    >
      <PageEditor
        pageId={pageData.id}
        liveMode={true}
      />
    </EditorProvider>
  )
}

export default Page