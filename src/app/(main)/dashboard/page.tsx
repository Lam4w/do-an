import Dashboard from '@/components/main/Dashboard'
import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'

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