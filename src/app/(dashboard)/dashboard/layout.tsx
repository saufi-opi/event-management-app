import MaxWidthWrapper from '@/components/max-width-wrapper'
import MobileSidebar from '@/components/navigation/mobile-sidebar'
import Sidebar from '@/components/navigation/sidebar'
import React from 'react'

function DahsboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2">
      <Sidebar className="hidden md:block" />
      <MobileSidebar className="block md:hidden" />
      <MaxWidthWrapper className="py-20 md:py-10">{children}</MaxWidthWrapper>
    </div>
  )
}

export default DahsboardLayout
