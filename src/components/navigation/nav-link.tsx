'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { type Menu } from './app-menu'

export default function NavLink({ href, title, icon }: Menu) {
  const pathName = usePathname()

  return (
    <div className={`text-gray-300 duration-300 hover:text-gray-100 ${pathName !== href && 'text-gray-400'}`}>
      <Link className={`flex gap-3 py-3 pl-10 ${pathName === href && 'bg-background text-black'}`} href={href}>
        <span className="h-6 w-6">{icon}</span>
        <span>{title}</span>
      </Link>
    </div>
  )
}
