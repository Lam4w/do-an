import { Card, CardContent } from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import { SubPage } from '@prisma/client'
import { ArrowDown, Mail } from 'lucide-react'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { createPortal } from 'react-dom'

type PageStepCardProps = {
  subPage: SubPage
  index: number
  activePage: boolean
}

const PageStepCard = ({ activePage, subPage, index }: PageStepCardProps) => {
  let portal = document.getElementById('user-page')

  return (
    <Draggable
      draggableId={subPage.id.toString()}
      index={index}
    >
      {(provided, snapshot) => {
        if (snapshot.isDragging) {
          const offset = { x: 300 }
          //@ts-ignore
          const x = provided.draggableProps.style?.left - offset.x
          //@ts-ignore
          provided.draggableProps.style = {
            ...provided.draggableProps.style,
            //@ts-ignore
            left: x,
          }
        }
        const component = (
          <Card
            className={cn("p-1 relative cursor-grab my-2", activePage && "border-emerald-500 border-[1.5px]")}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <CardContent className="p-0 flex items-center gap-4 flex-row">
              <div className="h-14 w-14 bg-muted flex items-center justify-center rounded-sm">
                <Mail />
              </div>
              {subPage.name}
            </CardContent>
          </Card>
        )
        if (!portal) return component
        if (snapshot.isDragging) {
          return createPortal(component, portal)
        }
        return component
      }}
    </Draggable>
  )
}

export default PageStepCard