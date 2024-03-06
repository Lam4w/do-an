// import "@/styles/editor.css";
import NovelEditor from "@/components/editor/NovelEditor";
import Bold from '@tiptap/extension-bold'
// Option 2: Browser-only (lightweight)
// import { generateHTML } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
// Option 1: Browser + server-side
import { generateHTML } from '@tiptap/html'
import React, { useMemo } from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/Resizable"

const json = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Example ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'Text',
        },
      ],
    },
  ],
}

export default function Page() {
  const output = useMemo(() => {
    return generateHTML(json, [
      Document,
      Paragraph,
      Text,
      Bold,
      // other extensions …
    ])
  }, [json])

  return (
    <div className="w-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[100vh] w-full rounded-lg border"
      >
        <ResizablePanel defaultSize={25} minSize={15}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75} minSize={50}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

// <div
//   className={cn(
//     "grid",
//     store.settings.layout === 'twoCol' ? "grid-cols-2 space-x-3" : "grid-cols-1"
//   )}
// >
//   {store.settings.layout === 'twoCol' && (
//     // <SyntaxHelper value={contentRight} onChange={setContentRight} />
//     <NovelEditor content={store.contentSide} onChange={store.setContentSide} />
//   )}
//   {/* <SyntaxHelper value={contentLeft} onChange={setContentLeft} /> */}
//   <NovelEditor content={store.contentMain} onChange={store.setContentMain} />
// </div>