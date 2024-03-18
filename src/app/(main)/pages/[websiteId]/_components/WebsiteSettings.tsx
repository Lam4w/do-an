import React from 'react'

import { Website, User } from '@prisma/client'
import { db } from '@/lib/db'

import WebsiteForm from '@/components/forms/WebsiteForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'

interface WebsiteSettingsProps {
  ownerId: string
  defaultData: Website
}

const PageSettings: React.FC<WebsiteSettingsProps> = async ({
  ownerId,
  defaultData,
}) => {
  const ownerDetails = await db.user.findUnique({
    where: {
      id: ownerId,
    },
  })

  if (!ownerDetails) return

  return (
    <div className="flex gap-4 flex-col xl:!flex-row">
      <WebsiteForm
        ownerId={ownerId}
        defaultData={defaultData}
      />
    </div>
  )
}

export default PageSettings