import React from 'react'

import { Page, User } from '@prisma/client'
import { db } from '@/lib/db'

import PageForm from '@/components/forms/PageForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'

interface PageSettingsProps {
  ownerId: string
  defaultData: Page
}

const PageSettings: React.FC<PageSettingsProps> = async ({
  ownerId,
  defaultData,
}) => {
  //CHALLENGE: go connect your stripe to sell products

  const ownerDetails = await db.user.findUnique({
    where: {
      id: ownerId,
    },
  })

  if (!ownerDetails) return

  return (
    <div className="flex gap-4 flex-col xl:!flex-row">
      <PageForm
        ownerId={ownerId}
        defaultData={defaultData}
      />
    </div>
  )
}

export default PageSettings