import { EditorElement } from '@/providers/pageEditor/PageEditorProvider'
import React from 'react'
import TextComponent from './Text'
import ContainerComponent from './Container'
import VideoComponent from './Video'
import LinkComponent from './Link'

type Props = {
  element: EditorElement
}

const Recursive = ({ element }: Props) => {
  switch (element.type) {
    case '__body':
      return <ContainerComponent element={element} />
    case 'container':
      return <ContainerComponent element={element} />
    case 'text':
      return <TextComponent element={element} />
    case 'video':
      return <VideoComponent element={element} />
    case '2Col':
      return <ContainerComponent element={element} />
    case 'link':
      return <LinkComponent element={element} />
    default:
      return null
  }
}

export default Recursive