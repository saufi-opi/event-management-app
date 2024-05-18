import React from 'react'
import AppMenu from './app-menu'

function Sidebar() {
  return (
    <div className="min-h-screen min-w-[300px] border-r-[1px] border-gray-900 bg-gray-900 text-white">
      <div className="border-b border-gray-400 p-5">
        <h1 className="text-center text-xl font-bold">Event Management App</h1>
      </div>
      <div className="flex flex-col gap-3 py-10">
        <AppMenu />
      </div>
    </div>
  )
}

export default Sidebar
