'use client'

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSession } from 'next-auth/react'
import { LoaderIcon } from 'lucide-react'

function Profilecard() {
  const session = useSession()
  const user = session.data?.user

  return (
    <div className="flex items-center justify-center gap-6 bg-gray-900 p-4 text-white">
      {user ? (
        <>
          <Avatar>
            <AvatarImage alt="avatar" src={(user.image ??= '')} />
            <AvatarFallback className="text-gray-900">CN</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
          </div>
        </>
      ) : (
        <LoaderIcon className="animate-spin" />
      )}
    </div>
  )
}

export default Profilecard
