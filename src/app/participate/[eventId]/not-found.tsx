import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mt-4 text-2xl font-medium text-gray-500 dark:text-gray-400">Oops! Event not found.</p>
          <p className="mt-2 text-base text-gray-500 dark:text-gray-400">The event you are looking for might have been removed or expired.</p>
        </div>
        <div className="flex justify-center">
          <Link href="/">
            <Button>Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
