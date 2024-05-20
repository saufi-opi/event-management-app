import MaxWidthWrapper from '@/components/max-width-wrapper'
import Sidebar from '@/components/navigation/sidebar'
import React from 'react'

function DahsboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2">
      <Sidebar />
      <MaxWidthWrapper className="py-10">{children}</MaxWidthWrapper>
    </div>
  )
}

export default DahsboardLayout
