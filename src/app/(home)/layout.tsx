import Navbar from '@/components/navigation/navbar'
import React from 'react'

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="grow">{children}</main>
    </div>
  )
}

export default HomeLayout
