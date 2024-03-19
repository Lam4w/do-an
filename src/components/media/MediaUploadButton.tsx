'use client'
import { useModal } from '@/providers/ModalProvider'
import React from 'react'
import { Button } from '../ui/Button'
import CustomModal from '../global/CustomModal'
import UploadMediaForm from '../forms/MediaForm'

type Props = {
  ownerId: string
}

const MediaUploadButton = ({ ownerId }: Props) => {
  const { isOpen, setOpen, setClose } = useModal()

  return (
    <Button
      onClick={() => {
        setOpen(
          <CustomModal
            title="Upload Media"
            subheading="Upload a file to your media bucket"
          >
            <UploadMediaForm subaccountId={ownerId}></UploadMediaForm>
          </CustomModal>
        )
      }}
    >
      Upload
    </Button>
  )
}

export default MediaUploadButton