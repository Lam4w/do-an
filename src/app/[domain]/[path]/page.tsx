import PageEditor from '@/app/(main)/pages/[websiteId]/editor/[pageId]/_components/pageEditor/PageEditor'
import { getDomainContent } from '@/lib/server/queries'
import EditorProvider from '@/providers/pageEditor/PageEditorProvider'
import { notFound } from 'next/navigation'
import React from 'react'

const Page = async ({
  params,
}: {
  params: { domain: string; path: string }
}) => {
  const domainData = await getDomainContent(params.domain.slice(0, -1))
  const pageData = domainData?.pages.find(
    (page) => page.pathName === params.path
  )

  if (!pageData || !domainData) return notFound()

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