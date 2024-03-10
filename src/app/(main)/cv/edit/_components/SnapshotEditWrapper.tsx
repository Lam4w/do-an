'use client'

import useSnapshotContent from '@/lib/store'
import { Settings, Snapshot } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import Designer from "@/app/(main)/cv/edit/_components/Designer";
import Editor from "@/app/(main)/cv/edit/_components/Editor";
import { Separator } from "@/components/ui/Separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { JSONContent } from 'novel';

interface SnapshotEditWrapperProps {
  snapshot: Snapshot
}

const SnapshotEditWrapper = ({ snapshot } : SnapshotEditWrapperProps) => {
  const [contentMain, setContentMain] = useState<JSONContent>(JSON.parse(snapshot.contentMain))
  const [contentSide, setContentSide] = useState<JSONContent>(JSON.parse(snapshot.contentSide))
  const [settings, setSettings] = useState<Settings>(snapshot.settings)
  const [title, setTitle] = useState<string>(snapshot.title)

  const onChangeSettings = (field: string, value: string | number | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <>
      <TabsContent value="edit" className="m-0">
        <Editor 
          snapshot={snapshot} 
          contentMain={contentMain} 
          contentSide={contentSide} 
          settings={settings} 
          title={title} 
          onChangeContentMain={setContentMain} 
          onChangeContentSide={setContentSide} 
          onChangeTitle={setTitle} 
          onChangeSettings={onChangeSettings}
        />
      </TabsContent>
      <TabsContent value="design" className="m-0">
          <Designer snapshot={snapshot} settings={settings} setSettings={onChangeSettings} />
      </TabsContent>
    </>
  )
}

export default SnapshotEditWrapper