import { LoaderIcon } from 'lucide-react'
import React from 'react'

function DashboardLoading() {
  return (
    <div className="flex min-h-full items-center justify-center">
      <LoaderIcon className="animate-spin" />
    </div>
  )
}

export default DashboardLoading
