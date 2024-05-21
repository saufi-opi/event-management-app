import React from 'react'
import AppMenu from './app-menu'
import { cn } from '@/lib/utils'
import LogoutButton from '../logout-button'

interface Props {
  className?: string
}

function Sidebar({ className }: Props) {
  return (
    <div className={cn('min-h-screen min-w-[300px] border-r-[1px] border-gray-900 bg-gray-900 text-white', className)}>
      <div className="border-b border-gray-400 p-5">
        <h1 className="text-center text-xl font-bold">Event Management App</h1>
      </div>
      <div className="flex flex-col gap-3 py-10">
        <AppMenu />
      </div>
      <div className="mx-auto my-5 w-3/4">
        <LogoutButton className="w-full" variant="destructive">
          Logout
        </LogoutButton>
      </div>
    </div>
  )
}

export default Sidebar
