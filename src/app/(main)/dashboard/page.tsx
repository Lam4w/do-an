import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'
import Dashboard from '@/components/main/Dashboard';

const page = async () => {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect("/")
  }

  return (
    <div className=''>
      <Dashboard />
    </div>
  )
}

export default page