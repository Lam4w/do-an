'use client'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/Sheet'
import { Tabs, TabsContent } from '@/components/ui/Tabs'
import { cn } from '@/lib/utils'
import { useEditor } from '@/providers/pageEditor/PageEditorProvider'
import React from 'react'
import TabList from './tabs/Tablist'
import SettingsTab from './tabs/SettingsTab'
import MediaBucketTab from './tabs/MediaBucketTab'
import ComponentsTab from './tabs/componentsTab/ComponentsTab'
// import ComponentsTab from './tabs/components-tab'

type WebsiteEditorSidebarProps = {
  ownerId: string
}

const WebsiteEditorSidebar = ({ ownerId }: WebsiteEditorSidebarProps) => {
  const { state, dispatch } = useEditor()

  return (
    <Sheet
      open={true}
      modal={false}
    >
      <Tabs
        className="w-full "
        defaultValue="Settings"
      >
        <SheetContent
          // showX={false}
          side="right"
          className={cn(
            'mt-[65px] w-16 z-[80] shadow-none px-0 pb-0 pt-1 focus:border-none transition-all overflow-hidden',
            state.editor.previewMode && 'hidden'
          )}
        >
          <TabList />
        </SheetContent>

        <SheetContent
          // showX={false}
          side="right"
          className={cn(
            'mt-[65px] w-80 z-[40] shadow-none px-0 pb-0 pt-1 mr-16 bg-background h-full transition-all overflow-hidden ',
            state.editor.previewMode && 'hidden'
          )}
        >
          <div className="grid gap-4 h-full pb-36 overflow-scroll">
            <TabsContent value="Settings">
              <SheetHeader className="text-left p-6">
                <SheetTitle>Styles</SheetTitle>
                <SheetDescription>
                  Change your CSS styles
                </SheetDescription>
              </SheetHeader>
              <SettingsTab />
            </TabsContent>
            <TabsContent value="Media">
              <MediaBucketTab ownerId={ownerId} />/
            </TabsContent>
            <TabsContent value="Components">
              <SheetHeader className="text-left p-6 ">
                <SheetTitle>Components</SheetTitle>
                <SheetDescription>
                  You can drag and drop components on the canvas
                </SheetDescription>
              </SheetHeader>
              <ComponentsTab />
            </TabsContent>
          </div>
        </SheetContent>
      </Tabs>
    </Sheet>
  )
}

export default WebsiteEditorSidebar