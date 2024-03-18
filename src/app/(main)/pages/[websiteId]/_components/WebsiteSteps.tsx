'use client'

import CreatePage from '@/components/forms/PageForm'
import CustomModal from '@/components/global/CustomModal'
import { AlertDialog } from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'
import { ScrollArea } from '@/components/ui/ScrollArea'
import { toast } from '@/hooks/use-toast'
import { upsertPage } from '@/lib/server/queries'
import { WebsitesForUserAccount } from '@/lib/types'
import { useModal } from '../../../../../providers/ModalProvider'
import { Page } from '@prisma/client'
import { Check, ExternalLink, LayoutTemplate, LucideEdit } from 'lucide-react'
import React, { useState } from 'react'

import {
  DragDropContext,
  DragStart,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd'
import Link from 'next/link'
import SubPagePlaceholder from '@/components/icons/PagePlaceholder'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'
import FunnelStepCard from './WebsiteStepCard'

type WebsiteStepsProps = {
  website: WebsitesForUserAccount
  ownderId: string
  pages: Page[]
  websiteId: string
}

const WebsiteSteps = ({ website, websiteId, pages, ownderId }: WebsiteStepsProps) => {
  const [clickedPage, setClickedPage] = useState<Page | undefined>(
    pages[0]
  )
  const { setOpen } = useModal()
  const [pagesState, setPagesState] = useState(pages)
  const onDragStart = (event: DragStart) => {
    //current chosen page
    const { draggableId } = event
    const value = pagesState.find((page) => page.id === draggableId)
  }

  const onDragEnd = (dropResult: DropResult) => {
    const { destination, source } = dropResult

    //no destination or same position
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return
    }
    //change state
    const newPageOrder = [...pagesState]
      .toSpliced(source.index, 1)
      .toSpliced(destination.index, 0, pagesState[source.index])
      .map((page, idx) => {
        return { ...page, order: idx }
      })

    setPagesState(newPageOrder)
    newPageOrder.forEach(async (page, index) => {
      try {
        await upsertPage(
          ownderId,
          {
            id: page.id,
            order: index,
            name: page.name,
          },
          websiteId
        )
      } catch (error) {
        console.log(error)
        toast({
          variant: 'destructive',
          title: 'Failed',
          description: 'Could not save page order',
        })
        return
      }
    })

    toast({
      title: 'Success',
      description: 'Saved page order',
    })
  }

  return (
    <AlertDialog>
      <div className="flex border-[1px] lg:!flex-row flex-col ">
        <aside className="flex-[0.3] bg-background p-6  flex flex-col justify-between ">
          <ScrollArea className="h-full ">
            <div className="flex gap-4 items-center">
              <LayoutTemplate />
              Pages
            </div>
            {pagesState.length ? (
              <DragDropContext
                onDragEnd={onDragEnd}
                onDragStart={onDragStart}
              >
                <Droppable
                  droppableId="funnels"
                  direction="vertical"
                  key="funnels"
                >
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {pagesState.map((page, idx) => (
                        <div
                          className="relative"
                          key={page.id}
                          onClick={() => setClickedPage(page)}
                        >
                          <FunnelStepCard
                            page={page}
                            index={idx}
                            key={page.id}
                            activePage={page.id === clickedPage?.id}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <div className="text-center text-muted-foreground py-6">
                No Pages
              </div>
            )}
          </ScrollArea>
          <Button
            className="mt-4 w-full"
            onClick={() => {
              setOpen(
                <CustomModal
                  title=" Create or Update a Sub Page"
                  subheading="Funnel Pages allow you to create step by step processes for customers to follow"
                >
                  <CreatePage
                    ownerId={ownderId}
                    websiteId={websiteId}
                    order={pagesState.length}
                  />
                </CustomModal>
              )
            }}
          >
            Create New Pages
          </Button>
        </aside>
        <aside className="flex-[0.7] bg-muted p-4 ">
          {!!pages.length ? (
            <Card className="h-full flex justify-between flex-col">
              <CardHeader>
                <p className="text-sm text-muted-foreground">Page name</p>
                <CardTitle>{clickedPage?.name}</CardTitle>
                <CardDescription className="flex flex-col gap-4">
                  <div className="border-2 rounded-lg sm:w-80 w-full  overflow-clip">
                    <Link
                      href={`/pages/${websiteId}/editor/${clickedPage?.id}`}
                      className="relative group"
                    >
                      <div className="cursor-pointer group-hover:opacity-30 w-full">
                        <SubPagePlaceholder />
                      </div>
                      <LucideEdit
                        size={50}
                        className="!text-muted-foreground absolute top-1/2 left-1/2 opacity-0 transofrm -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 transition-all duration-100"
                      />
                    </Link>

                    <Link
                      target="_blank"
                      href={`${process.env.NEXT_PUBLIC_SCHEME}${website.subDomainName}.${process.env.NEXT_PUBLIC_DOMAIN}/${clickedPage?.pathName}`}
                      className="group flex items-center justify-start p-2 gap-2 hover:text-primary transition-colors duration-200"
                    >
                      <ExternalLink size={15} />
                      <div className="w-64 overflow-hidden overflow-ellipsis ">
                        {process.env.NEXT_PUBLIC_SCHEME}
                        {website.subDomainName}.{process.env.NEXT_PUBLIC_DOMAIN}/
                        {clickedPage?.pathName}
                      </div>
                    </Link>
                  </div>

                  <CreatePage
                    ownerId={ownderId}
                    defaultData={clickedPage}
                    websiteId={websiteId}
                    order={clickedPage?.order || 0}
                  />
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="h-[600px] flex items-center justify-center text-muted-foreground">
              Create a page to view page settings.
            </div>
          )}
        </aside>
      </div>
    </AlertDialog>
  )
}

export default WebsiteSteps