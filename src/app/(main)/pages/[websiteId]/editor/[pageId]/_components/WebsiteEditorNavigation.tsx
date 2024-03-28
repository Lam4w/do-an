'use client'

import { Button, buttonVariants } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Switch } from '@/components/ui/Switch'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip'
import { upsertPage } from '@/lib/server/queries'
import { cn } from '@/lib/utils'
import { DeviceTypes, useEditor } from '@/providers/pageEditor/PageEditorProvider'
import { Page } from '@prisma/client'
import {
  ArrowLeft,
  EyeIcon,
  Laptop,
  Redo2,
  Smartphone,
  Tablet,
  Undo2,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FocusEventHandler, useEffect } from 'react'
import { toast } from 'sonner'

type WebsiteEditorNavigationProps = {
  websiteId: string
  pageDetails: Page
  ownerId: string
}

const WebsiteEditorNavigation = ({
  websiteId,
  pageDetails,
  ownerId,
}: WebsiteEditorNavigationProps) => {
  const router = useRouter()
  const { state, dispatch } = useEditor()

  useEffect(() => {
    dispatch({
      type: 'SET_PAGE_ID',
      payload: { pageId: pageDetails.id },
    })
  }, [pageDetails])

  const handleOnBlurTitleChange: FocusEventHandler<HTMLInputElement> = async (
    event
  ) => {
    if (event.target.value === pageDetails.name) return
    if (event.target.value) {
      await upsertPage(
        ownerId,
        {
          id: pageDetails.id,
          name: event.target.value,
          order: pageDetails.order,
        },
        websiteId
      )

      toast('Success', {
        description: 'Saved Funnel Page title',
      })
      router.refresh()
    } else {
      toast('Oppse!', {
        description: 'You need to have a title!',
      })
      event.target.value = pageDetails.name
    }
  }

  const handlePreviewClick = () => {
    dispatch({ type: 'TOGGLE_PREVIEW_MODE' })
    dispatch({ type: 'TOGGLE_LIVE_MODE' })
  }

  const handleUndo = () => {
    dispatch({ type: 'UNDO' })
  }

  const handleRedo = () => {
    dispatch({ type: 'REDO' })
  }

  const handleOnSave = async () => {
    const content = JSON.stringify(state.editor.elements)
    try {
      const response = await upsertPage(
        ownerId,
        {
          ...pageDetails,
          content,
        },
        websiteId
      )
      toast('Success', {
        description: 'Saved Editor',
      })
    } catch (error) {
      toast('Error', {
        description: 'Could not save editor',
      })
    }
  }

  return (
    <TooltipProvider>
      <nav
        className={cn(
          'border-b-[1px] flex items-center justify-between px-4 py-2 gap-2 transition-all',
          state.editor.previewMode && '!h-0 !p-0 !overflow-hidden'
        )}
      >
        <aside className="flex items-center gap-4 max-w-[260px] w-[300px]">
          <Link href={`/pages/${websiteId}`} className={buttonVariants({ variant: "ghost" })}>
            <ArrowLeft />
          </Link>
          <div className="flex flex-col w-full ">
            <Input
              defaultValue={pageDetails.name}
              className="border-none h-5 m-0 p-0 text-lg"
              onBlur={handleOnBlurTitleChange}
            />
            <span className="text-sm text-muted-foreground">
              Path: /{pageDetails.pathName}
            </span>
          </div>
        </aside>
        <aside>
          <Tabs
            defaultValue="Desktop"
            className="w-fit "
            value={state.editor.device}
            onValueChange={(value) => {
              dispatch({
                type: 'CHANGE_DEVICE',
                payload: { device: value as DeviceTypes },
              })
            }}
          >
            <TabsList className="grid w-full grid-cols-3 bg-transparent h-fit">
              <Tooltip>
                <TooltipTrigger>
                  <TabsTrigger
                    value="Desktop"
                    className="data-[state=active]:bg-muted w-10 h-10 p-0"
                  >
                    <Laptop />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Desktop</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <TabsTrigger
                    value="Tablet"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                  >
                    <Tablet />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tablet</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <TabsTrigger
                    value="Mobile"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                  >
                    <Smartphone />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mobile</p>
                </TooltipContent>
              </Tooltip>
            </TabsList>
          </Tabs>
        </aside>
        <aside className="flex items-center gap-2">
          <div className="flex flex-col w-full pr-5">
            <div className="w-full flex items-center space-x-2">
              <Button
                variant={'ghost'}
                size={'icon'}
                onClick={handlePreviewClick}
              >
                <EyeIcon />
              </Button>
              <Button
                disabled={!(state.history.currentIndex > 0)}
                onClick={handleUndo}
                variant={'ghost'}
                size={'icon'}
              >
                <Undo2 />
              </Button>
              <Button
                disabled={
                  !(state.history.currentIndex < state.history.history.length - 1)
                }
                onClick={handleRedo}
                variant={'ghost'}
                size={'icon'}
                className="mr-4"
              >
                <Redo2 />
              </Button>
            </div>
            <span className="text-muted-foreground text-xs">
              Last updated {pageDetails.updatedAt.toLocaleDateString()}
            </span>
          </div>
          {/* <div className="flex flex-col item-center mr-4">
            <div className="flex flex-row items-center gap-4">
              Draft
              <Switch
                disabled
                defaultChecked={true}
              />
              Publish
            </div>
            <span className="text-muted-foreground text-sm">
              Last updated {pageDetails.updatedAt.toLocaleDateString()}
            </span>
          </div> */}
          <Button onClick={handleOnSave}>Save</Button>
        </aside>
      </nav>
    </TooltipProvider>
  )
}

export default WebsiteEditorNavigation