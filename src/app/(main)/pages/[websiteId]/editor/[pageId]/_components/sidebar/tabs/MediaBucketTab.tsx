'use client'
import MediaComponent from '@/components/media/Media'
import { getMedia } from '@/lib/server/queries'
import { GetMediaFiles } from '@/lib/types'
import React, { useEffect, useState } from 'react'

type MediaBucketTabProps = {
  ownerId: string
}

const MediaBucketTab = ({ ownerId }: MediaBucketTabProps) => {
  const [data, setdata] = useState<GetMediaFiles>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMedia(ownerId)
      setdata(response)
    }
    fetchData()
  }, [ownerId])

  return (
    <div className="h-[900px] overflow-scroll p-4">
      <MediaComponent
        data={data}
        ownerId={ownerId}
      />
    </div>
  )
}

export default MediaBucketTab