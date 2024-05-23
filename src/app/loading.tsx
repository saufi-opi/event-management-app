import { LoaderIcon } from 'lucide-react'
import React from 'react'

function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoaderIcon className="animate-spin" />
    </div>
  )
}

export default Loading
