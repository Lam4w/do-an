import { EditorBtns } from '@/lib/const'
import { BoxSelect, Columns2 } from 'lucide-react'
import React from 'react'

type Props = {}

const TwoColumnsPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, '2Col')}
      className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center cursor-grab"
    >
      <Columns2 
        size={40}
        className="text-muted-foreground"
      />
    </div>
  )
}

export default TwoColumnsPlaceholder