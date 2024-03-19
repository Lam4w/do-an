import { EditorElement } from '@/providers/pageEditor/PageEditorProvider'
import React from 'react'
import TextComponent from './TextComponent'
// import Container from './container'
// import VideoComponent from './video'
// import LinkComponent from './link-component'
// import ContactFormComponent from './contact-form-component'

type Props = {
  element: EditorElement
}

const Recursive = ({ element }: Props) => {
  switch (element.type) {
    case 'text':
      return <TextComponent element={element} />
    // case 'container':
    //   return <Container element={element} />
    // case 'video':
    //   return <VideoComponent element={element} />
    // case 'contactForm':
    //   return <ContactFormComponent element={element} />
    // case '2Col':
    //   return <Container element={element} />
    // case '__body':
    //   return <Container element={element} />
    // case 'link':
    //   return <LinkComponent element={element} />
    default:
      return null
  }
}

export default Recursive