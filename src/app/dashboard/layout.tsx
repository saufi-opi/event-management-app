import Sidebar from '@/components/navigation/sidebar'
import React from 'react'

function DahsboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2">
      <Sidebar />
      <main className="grow">{children}</main>
    </div>
  )
}

export default DahsboardLayout
