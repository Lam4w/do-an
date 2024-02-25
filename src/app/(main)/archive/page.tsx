import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'
import Dashboard from '@/app/(main)/dashboard/_components/Dashboard';
import Archive from '@/app/(main)/archive/_components/Archive';

const page = async () => {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect("/")
  }

  return (
    <div className=''>
      <Archive />
    </div>
  )
}

export default page